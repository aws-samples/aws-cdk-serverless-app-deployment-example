#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RecordsAppStack } from '../lib/records_app-stack';

const app = new cdk.App();
new RecordsAppStack(app, 'RecordsAppStack');
