import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots';
import { render } from '@testing-library/react-native';

initStoryshots({
  asyncJest: true,
  test: ({ story, context, done }) => {
    const converter = new Stories2SnapsConverter();
    const snapshotFilename = converter.getSnapshotFileName(context);
    const storyElement = story.render();

    (process as any).browser = true;

    // mount the story
    const tree = render(storyElement);

    // wait until the mount is updated, in our app mostly by Relay
    // but maybe something else updating the state of the component
    // somewhere

    const waitTime = 1;
    setTimeout(() => {
      if (snapshotFilename) {
        expect(tree.toJSON()).toMatchSpecificSnapshot(snapshotFilename);
      }
      done();
    }, waitTime);
  },
});
