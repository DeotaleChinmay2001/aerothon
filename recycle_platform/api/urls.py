from django.urls import path
from .views import HelloWorld, LoginAPIView

urlpatterns = [
    path('hello/', HelloWorld.as_view()),
    path('login/', LoginAPIView.as_view(), name='login'),
]