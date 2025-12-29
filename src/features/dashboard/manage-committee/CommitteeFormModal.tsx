'use client';

import {useEffect, useMemo, useState} from 'react';
import Modal from '@components/ui/modal/Modal';
import type {CommitteeFormValues, CommitteeRow} from './types';
import {slugify} from './slug';

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

type Props = {
  open: boolean;
  mode: 'create' | 'edit';
  initial?: CommitteeRow | null;
  busy?: boolean;
  onClose: () => void;
  onSubmit: (values: CommitteeFormValues) => void;
};

export default function CommitteeFormModal({
  open,
  mode,
  initial,
  busy,
  onClose,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<CommitteeFormValues>({
    positionName: '',
    positionSlug: '',
    positionOrder: 1,

    fullName: '',
    designation: '',
    companyName: '',

    profileImage: null,

    facebookUrl: '',
    linkedinUrl: '',
    whatsappUrl: '',

    isActive: true,
  });

  useEffect(() => {
    if (!open) return;

    if (mode === 'edit' && initial) {
      setValues({
        positionName: initial.positionName,
        positionSlug: initial.positionSlug,
        positionOrder: initial.positionOrder,

        fullName: initial.fullName,
        designation: initial.designation,
        companyName: initial.companyName,

        profileImage: null,

        facebookUrl: initial.facebookUrl ?? '',
        linkedinUrl: initial.linkedinUrl ?? '',
        whatsappUrl: initial.whatsappUrl ?? '',

        isActive: initial.isActive,
      });
      return;
    }

    setValues({
      positionName: '',
      positionSlug: '',
      positionOrder: 1,

      fullName: '',
      designation: '',
      companyName: '',

      profileImage: null,

      facebookUrl: '',
      linkedinUrl: '',
      whatsappUrl: '',

      isActive: true,
    });
  }, [open, mode, initial]);

  const canSave = useMemo(() => {
    const baseOk =
      values.positionName.trim().length > 0 &&
      values.positionSlug.trim().length > 0 &&
      values.fullName.trim().length > 0 &&
      values.designation.trim().length > 0 &&
      values.companyName.trim().length > 0 &&
      Number(values.positionOrder) > 0;

    const imageOk = mode === 'edit' ? true : Boolean(values.profileImage);
    return baseOk && imageOk;
  }, [values, mode]);

  return (
    <Modal
      open={open}
      title={mode === 'create' ? 'Add Committee' : 'Edit Committee'}
      onClose={onClose}
      maxWidthClassName="max-w-[820px]"
    >
      <form
        className="px-6 py-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSave || busy) return;
          onSubmit(values);
        }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Position Name*">
            <input
              value={values.positionName}
              onChange={(e) => {
                const next = e.target.value;
                setValues((p) => ({
                  ...p,
                  positionName: next,
                  positionSlug: p.positionSlug.trim() ? p.positionSlug : slugify(next),
                }));
              }}
              className={inputCls()}
              placeholder="e.g. President"
            />
          </Field>

          <Field label="Position Slug*">
            <input
              value={values.positionSlug}
              onChange={(e) =>
                setValues((p) => ({...p, positionSlug: slugify(e.target.value)}))
              }
              className={inputCls()}
              placeholder="e.g. president"
            />
          </Field>

          <Field label="Position Order*">
            <input
              type="number"
              min={1}
              value={values.positionOrder}
              onChange={(e) =>
                setValues((p) => ({...p, positionOrder: Number(e.target.value)}))
              }
              className={inputCls()}
              placeholder="e.g. 1"
            />
          </Field>

          <Field label="Active">
            <label className="flex h-10 items-center gap-2 rounded-lg border px-3 text-[13px] text-slate-700">
              <input
                type="checkbox"
                checked={values.isActive}
                onChange={(e) => setValues((p) => ({...p, isActive: e.target.checked}))}
              />
              <span>Is Active</span>
            </label>
          </Field>

          <Field label="Full Name*">
            <input
              value={values.fullName}
              onChange={(e) => setValues((p) => ({...p, fullName: e.target.value}))}
              className={inputCls()}
              placeholder="e.g. Md. Rahim Badsa"
            />
          </Field>

          <Field label="Designation*">
            <input
              value={values.designation}
              onChange={(e) => setValues((p) => ({...p, designation: e.target.value}))}
              className={inputCls()}
              placeholder="e.g. General Secretary"
            />
          </Field>

          <Field label="Company Name*">
            <input
              value={values.companyName}
              onChange={(e) => setValues((p) => ({...p, companyName: e.target.value}))}
              className={inputCls()}
              placeholder="e.g. ABC LPG Ltd."
            />
          </Field>

          <Field label={mode === 'create' ? 'Profile Image* (max 10MB)' : 'Profile Image (optional)'}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setValues((p) => ({...p, profileImage: f}));
              }}
              className="h-10 w-full rounded-lg border bg-white px-3 text-[13px] outline-none"
            />
          </Field>

          <Field label="Facebook URL (optional)">
            <input
              value={values.facebookUrl}
              onChange={(e) => setValues((p) => ({...p, facebookUrl: e.target.value}))}
              className={inputCls()}
              placeholder="https://facebook.com/..."
            />
          </Field>

          <Field label="LinkedIn URL (optional)">
            <input
              value={values.linkedinUrl}
              onChange={(e) => setValues((p) => ({...p, linkedinUrl: e.target.value}))}
              className={inputCls()}
              placeholder="https://linkedin.com/in/..."
            />
          </Field>

          <Field label="WhatsApp URL (optional)">
            <input
              value={values.whatsappUrl}
              onChange={(e) => setValues((p) => ({...p, whatsappUrl: e.target.value}))}
              className={inputCls()}
              placeholder="https://wa.me/..."
            />
          </Field>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-lg border px-4 text-[12px] text-slate-700 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!canSave || busy}
            className={cx(
              'h-9 rounded-lg bg-emerald-600 px-5 text-[12px] font-semibold text-white',
              'hover:bg-emerald-700 disabled:opacity-60'
            )}
          >
            {busy ? 'Saving...' : 'Save'}
          </button>
        </div>

        {mode === 'create' ? (
          <div className="mt-2 text-[11px] text-slate-500">
            Profile image is required on create.
          </div>
        ) : null}
      </form>
    </Modal>
  );
}

function inputCls() {
  return 'h-10 w-full rounded-lg border px-3 text-[13px] outline-none focus:ring-2 focus:ring-emerald-200';
}

function Field({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div>
      <div className="mb-1 text-[12px] font-semibold text-slate-600">{label}</div>
      {children}
    </div>
  );
}
