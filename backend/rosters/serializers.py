from rest_framework import serializers
from rosters.models import ClassBatch, Learner


class ClassBatchLearnersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Learner
        fields = (
            "id",
            "first_name",
            "last_name",
            "grade",
        )
        read_only_fields = fields


class ClassBatchViewSerializer(serializers.ModelSerializer):
    learners = ClassBatchLearnersSerializer(many=True, read_only=True)
    # learners = serializers.CharField(source="")

    class Meta:
        model = ClassBatch
        fields = ("id", "name", "instructor", "learners",)
        read_only_fields = fields


class LearnerViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Learner
        fields = (
            "id",
            "first_name",
            "last_name",
            "grade",
            "classbatch",
        )
