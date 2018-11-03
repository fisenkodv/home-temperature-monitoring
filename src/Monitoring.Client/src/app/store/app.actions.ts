export class SetLoading {
  static readonly type = '[application] set loading';

  constructor(public loading: boolean) {}
}
