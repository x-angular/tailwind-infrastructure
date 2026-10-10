export interface ICommandOption {
  flag: string;
  description?: string;
  defaultValue?: string | boolean | string[];
  required?: boolean;
}

export interface ICommandArgument {
  flag: string;
  description?: string;
  defaultValue?: string | boolean | string[];
}

export interface ICommand {
  name: string;
  action: any;
  description?: string;
  options?: ICommandOption[];
  arguments?: ICommandArgument[];
  allowUnknownOption?: boolean;
  allowExcessArguments?: boolean;
}
