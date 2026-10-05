import prompts from 'prompts';

import { ICommand, ICommandArgument, ICommandOption } from '../types';

export abstract class BaseCommand<T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>> implements ICommand {
  abstract name: string;

  description?: string;
  options: ICommandOption[] = [];
  arguments: ICommandArgument[] = [];
  allowUnknownOption = false;
  allowExcessArguments = false;

  private _store: T = {} as T;

  public abstract action(...args: unknown[]): Promise<void> | void;

  protected set store(data: Partial<T>) {
    this._store = {
      ...this._store,
      ...data,
    };
  }
  protected get store(): T {
    return this._store;
  }

  protected prompt<T extends string = string>(
    questions: prompts.PromptObject<T> | prompts.PromptObject<T>[],
    options?: prompts.Options,
  ): Promise<prompts.Answers<T>> {
    return prompts<T>(questions, options);
  }
}
