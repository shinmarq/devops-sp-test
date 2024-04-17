provider "aws" {
  region  = var.region
  profile = var.profile
}

module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"
  version = "4.1.0"

  bucket = var.bucket

  control_object_ownership = true
  object_ownership         = "BucketOwnerPreferred"

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

  versioning = {
    enabled = true
  }
}
