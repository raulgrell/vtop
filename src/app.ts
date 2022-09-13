import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import { HookContext as FeathersHookContext } from '@feathersjs/feathers';

import appHooks from './app.hooks';
import middleware from './middleware';
import authentication from './authentication';
import services from './services';
import channels from './channels';
import logger from './logger';
import objection from './objection';

import { Application } from './declarations';

// Don't remove this comment. It's needed to format import lines nicely.

const app: Application = express(feathers());
export type HookContext<T = any> = { app: Application } & FeathersHookContext<T>;

app.configure(configuration());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Database
app.configure(objection);

// App
app.configure(middleware);
app.configure(authentication);
app.configure(services);
app.configure(channels);

// Errors
app.use(express.notFound());
app.use(express.errorHandler({ logger } as any));

// Hooks
app.hooks(appHooks);

export default app;
