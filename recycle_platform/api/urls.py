from django.urls import path
from .views import HelloWorld, LoginAPIView, RecyclerDataView, PartDataView

urlpatterns = [
    path('hello/', HelloWorld.as_view()),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('recylersData/', RecyclerDataView.as_view(), name='recylerData'),
    path('updateStatus/', PartDataView.as_view(), name='updateStatus')
]