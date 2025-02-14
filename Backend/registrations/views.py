from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import supabase
import os
from .models import Registration
from .serializers import RegistrationSerializer

# Initialize Supabase connection
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supa = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

@api_view(['POST'])
@csrf_exempt
def register(request):
    print("Received Data:", request.data)  # Debugging: Check incoming data

    serializer = RegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        data = serializer.validated_data
        print("Validated Data:", data)  # Debugging: Check validated data

        # Save to Django database
        registration = serializer.save()

        # Prepare data for Supabase
        supabase_data = {
            "email": data.get("email"),
            "segment": data.get("segment"),
            "team_name": data.get("team_name"),
            "team_size": data.get("team_size"),
            "team_leader_name": data.get("team_leader_name"),
            "team_leader_phone": data.get("team_leader_phone"),
            "team_leader_email": data.get("team_leader_email"),
            "transaction_id": data.get("transaction_id"),
            "team_members": data.get("team_members", [])
        }

        print("Supabase Data:", supabase_data)  # Debugging: Check Supabase data

        # Save to Supabase
        try:
            response = supa.table("registrations").insert(supabase_data).execute()
            if response.status_code == 201:
                return Response({"message": "Registration successful!"}, status=201)
            else:
                return Response({"message": "Failed to save to Supabase."}, status=500)
        except Exception as e:
            return Response({"message": f"Error with Supabase: {str(e)}"}, status=500)
    else:
        print("Serializer Errors:", serializer.errors)  # Debugging: Check validation errors
        return Response(serializer.errors, status=400)