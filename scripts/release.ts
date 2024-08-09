import 'zx/globals'
import getGitRepoInfo from 'git-repo-info';

function assert(v: unknown, message: string) {
    if (!v) {
        console.error(message);
        process.exit(1);
    }
}

(async () => {
    const { branch } = getGitRepoInfo();
    await $`git fetch`;

    const gitStatus = (await $`git status --short --branch`).stdout.trim();
    assert(!gitStatus.includes('behind'), `git status is behind remote`);
    if (branch !== 'master') {
        await `standard-version --prerelease ${branch}`
    } else {
        await `standard-version`
    }
})()