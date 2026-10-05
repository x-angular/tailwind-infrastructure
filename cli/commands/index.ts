import { Type } from '@angular/core';

import { BaseCommand } from './base-command';
import { GraphCommand } from './graph/graph';

export const COMMANDS: Type<BaseCommand>[] = [GraphCommand];
