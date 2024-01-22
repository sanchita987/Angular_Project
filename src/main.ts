import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CommonModule } from '@angular/common';

import '@maptiler/sdk/dist/maptiler-sdk.css';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
