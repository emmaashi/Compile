from flask import Blueprint, request, jsonify
from datetime import datetime
from ..services.ml_service import HospiceCareService
from flask_login import login_required
import logging

hospice_bp = Blueprint('hospice', __name__)
hospice_service = HospiceCareService()

logging.basicConfig(level=logging.INFO)

@hospice_bp.route('/predict/care_needs', methods=['POST'])
@login_required
def predict_care_needs():
    try:
        data = request.get_json()

        # Validate input data
        required_fields = ["patient_age", "cancer_stage", "symptoms", "previous_treatments"]
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return jsonify({
                'status': 'error',
                'message': f"Missing required fields: {', '.join(missing_fields)}"
            }), 400

        logging.info(f"Received care prediction request: {data}")

        # Get recommendations from ML model
        recommendations = hospice_service.get_care_recommendations(data)

        return jsonify({
            'status': 'success',
            'recommendations': recommendations,
            'generated_at': datetime.now().isoformat(),
            'valid_for_hours': 24
        }), 200

    except KeyError as e:
        return jsonify({
            'status': 'error',
            'message': f"Missing key in request data: {str(e)}"
        }), 400

    except Exception as e:
        logging.error(f"Error predicting care needs: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': "An internal error occurred. Please try again later."
        }), 500