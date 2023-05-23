from django.shortcuts import render
from rest_framework import generics

from rosters.models import ClassBatch, Learner
from rosters.serializers import ClassBatchViewSerializer, LearnerViewSerializer


class ClassBatchView(
    generics.ListAPIView,
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = ClassBatchViewSerializer

    def get_queryset(self):
        return ClassBatch.objects.all()

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk is not None:
            return self.retrieve(request, *args, **kwargs)
        else:
            return self.list(request, *args, **kwargs)
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save(name=request.data.get('name'))  # Update the name field
        return super().update(request, *args, **kwargs)


class LearnerView(
    generics.ListAPIView,
    generics.RetrieveUpdateDestroyAPIView
):
    serializer_class = LearnerViewSerializer

    def get_queryset(self):
        return Learner.objects.all()

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if pk is not None:
            return self.retrieve(request, *args, **kwargs)
        else:
            return self.list(request, *args, **kwargs)
