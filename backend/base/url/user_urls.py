from django.urls import path
from base.view import user_views as views



urlpatterns = [
    
    path('profile/', views.getuserProfile, name="users-profile"),
    path('register/',views.registerUser,name='register'),
    path('', views.getUsers, name="users"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]