import { Ability, AbilityBuilder } from '@casl/ability';


export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';
export type Subjects = 'Todo' | 'User' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

export const defineAbilitiesFor = (role: string): AppAbility => {
  const { can, cannot, build } = new AbilityBuilder<Ability<[Actions, Subjects]>>(Ability);

  if (role === 'admin') {
    can('manage', 'all'); // Admin can do everything
  } else if (role === 'editor') {
    can('read', 'Todo');
    cannot('create', 'Todo');
    can('update', 'Todo');
    can('delete', 'Todo');
  } else if (role === 'user') {
    can('read', 'Todo')

  } else {
    can('read', 'Todo'); // Guest can only read
  }

  return build();
};
