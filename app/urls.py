from django.urls import path

from .views import get_weather, index

urlpatterns = [
    path('', index, name = 'index'),
    path('weather/', get_weather, name = 'get-weather')
]