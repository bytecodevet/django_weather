import json

from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from pyowm import OWM

owm = OWM('Your api key')
manager = owm.weather_manager()

@csrf_exempt
@require_POST
def get_weather(request: HttpRequest) -> HttpResponse:
    city = request.POST.get('city', 'London')
    observation = manager.weather_at_place(city)
    data = observation.to_dict()
    json_response = json.dumps(data)
    return HttpResponse(json_response, content_type = 'application/json')

def index(request: HttpRequest) -> HttpResponse:
    return render(request, 'app/index.html')