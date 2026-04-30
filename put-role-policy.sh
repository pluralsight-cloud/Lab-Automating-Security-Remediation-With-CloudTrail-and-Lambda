#!/bin/bash
aws iam put-role-policy \
  --role-name lab-target-role \
  --policy-name unauthorized-policy \
  --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"s3:*","Resource":"*"}]}'
