export class Todo {
    private _id: string;
    private _name: string;
    private _description: string;
    private _goalDate: Date;
    private _creationDate: Date;
    private _finishedDate: Date;
    private _type: boolean;
    private _subTodos: Todo[];

    constructor(id: string, name: string, description: string, goalDate: Date, creationDate: Date, finishedDate: Date, type: boolean, subTodos: Todo[]) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._goalDate = goalDate;
        this._creationDate = creationDate;
        this._finishedDate = finishedDate;
        this._type = type;
        this._subTodos = subTodos;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get goalDate(): Date {
        return this._goalDate;
    }

    set goalDate(value: Date) {
        this._goalDate = value;
    }

    get creationDate(): Date {
        return this._creationDate;
    }

    set creationDate(value: Date) {
        this._creationDate = value;
    }

    get finishedDate(): Date {
        return this._finishedDate;
    }

    set finishedDate(value: Date) {
        this._finishedDate = value;
    }

    get type(): boolean {
        return this._type;
    }

    set type(value: boolean) {
        this._type = value;
    }

    get subTodos(): Todo[] {
        return this._subTodos;
    }

    set subTodos(value: Todo[]) {
        this._subTodos = value;
    }
}