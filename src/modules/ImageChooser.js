/* @flow strict */

type ImageData = {
  height: number,
  width: number,
  size: number,
  name: string,
  uri: string,
};

export default class ImageChooser {
  static pickImage: () => Promise<ImageData>;
  static pickImageWithCamera: () => Promise<ImageData>;
}
