import { $, env, which } from 'bun';

import { BaseCommand } from '../base-command';

export class GraphCommand extends BaseCommand {
  name = 'graph';
  override description = 'Generate project graph';

  async action(): Promise<void> {
    console.log('Check requirements ...');

    if (!which('graphify')) {
      console.error('Please install graphify: https://graphify.com/docs/install');
      process.exit(1);
    }

    console.log('Run graphify ...');

    try {
      await $`graphify . --code-only`;
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    console.log('Generate GRAPH_REPORT.md and name communities ...');

    try {
      await $`graphify cluster-only .`;
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    const dir = env['GRAPHIFY_OUT'] || 'graphify-out';

    if (dir === '.graphify') {
      process.exit(1);
    }

    await $`rm -rf .graphify`;
    await $`mv ${dir} .graphify`;
  }
}
