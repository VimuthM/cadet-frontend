export class TreeNode {
  public left: TreeNode | number | null;
  public right: TreeNode | number | null;
  public elements: any[] | null;

  constructor() {
    this.left = null;
    this.right = null;
    this.elements = null;
  }
}
