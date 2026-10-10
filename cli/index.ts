import { Command } from 'commander';

import { COMMANDS } from './commands';

const program = new Command();

program.name('X Project').description('CLI tool to run cli across x project').version('1.0.0');

for (const CommandClass of COMMANDS) {
  const cmd = new CommandClass();

  const command = program.command(cmd.name);

  if (cmd.allowUnknownOption) {
    command.allowUnknownOption();
  }
  if (cmd.allowExcessArguments) {
    command.allowExcessArguments();
  }

  for (const arg of cmd.arguments) {
    command.argument(arg.flag, arg.description, arg.defaultValue);
  }

  for (const option of cmd.options) {
    const { required, ...args } = option;
    if (required) {
      command.requiredOption(args.flag, args.description, args.defaultValue);
    } else {
      command.option(args.flag, args.description, args.defaultValue);
    }
  }

  if (cmd.description) {
    command.description(cmd.description);
  }
  command.action(cmd.action.bind(cmd));
}

program.parse(process.argv);
