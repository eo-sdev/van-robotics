from django.shortcuts import render
from rest_framework import generics

from rosters.models import ClassBatch, Learner
from rosters.serializers import ClassBatchViewSerializer, LearnerViewSerializer


class ClassBatchView(
    generics.RetrieveAPIView,
    generics.ListAPIView,
    generics.DestroyAPIView,
    generics.UpdateAPIView,
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


class LearnerView(
    generics.RetrieveAPIView,
    generics.ListAPIView,
    generics.DestroyAPIView,
    generics.UpdateAPIView,
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
