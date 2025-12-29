type Ui = { cls: string };

function uiFor(role: string): Ui {
  const v = role.trim();

  if (v === 'Active') return { cls: 'bg-[#0B8F6B] text-white' };
  if (v === 'Inactive') return { cls: 'bg-[#F6C34A] text-[#1B2A41]' };

  if (v.startsWith('Order:')) return { cls: 'bg-[#0B2B3A] text-white' };

  // Default pill style for position_name etc.
  return { cls: 'bg-[#E8F3EC] text-[#1B2A41]' };
}

export default function RolePill({ role }: { role: string }) {
  const ui = uiFor(role);

  return (
    <span
      className={[
        'inline-flex h-[22px] items-center rounded-full px-4 text-[11px] font-semibold',
        ui.cls,
      ].join(' ')}
    >
      {role}
    </span>
  );
}
