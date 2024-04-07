import { ApplicationConfig } from '@angular/core';
import { myUrl } from './graphql.config';
import { provideRouter } from '@angular/router';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-angular/http';
import { ModalServices } from './services/modal.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ModalServices,
    provideClientHydration(),
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: (
        httpLink: HttpLink
      ): ApolloClientOptions<unknown> => ({
        link: ApolloLink.from([
          httpLink.create({ uri: myUrl }),
        ]),
        cache: new InMemoryCache()
      }),
      deps: [HttpLink]
    }
  ]
};
