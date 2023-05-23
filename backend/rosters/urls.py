from django.urls import path
from rosters import views


urlpatterns = [

    path('learner/', views.LearnerView.as_view(), name='LearnersView'),
    path('learner/<int:pk>/', views.LearnerView.as_view(), name='LearnerView'),
    path('classbatch/', views.LearnerView.as_view(), name='ClassBatchesView'),
    path('classbatch/<int:pk>/', views.ClassBatchView.as_view(), name='ClassBatchView'),

]
