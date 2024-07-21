export class Info {
  readonly name: string;
  readonly color: string;
  readonly owner: string;
  readonly department: string;
  constructor(name: string, color: string, owner: string, department: string) {
    this.name = name;
    this.color = color;
    this.owner = owner;
    this.department = department;
  }
}
