import React from 'react';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import type { PersonalInfo } from '../types';
import { EMPLOYMENT_STATUS_OPTIONS } from '../constants.ts';

interface PersonalInfoFormProps {
  data: Partial<PersonalInfo>;
  onNext: (data: PersonalInfo) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onNext }) => {
  const [formData, setFormData] = React.useState<Partial<PersonalInfo>>(data);
  const [errors, setErrors] = React.useState<Partial<Record<keyof PersonalInfo, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfo, string>> = {};

    if (!formData.age || formData.age < 18 || formData.age > 65) {
      newErrors.age = 'Age must be between 18 and 65';
    }

    if (!formData.employmentStatus) {
      newErrors.employmentStatus = 'Please select your employment status';
    }

    if (!formData.employmentDuration || formData.employmentDuration < 3) {
      newErrors.employmentDuration = 'Minimum 3 months employment required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData as PersonalInfo);
    }
  };

  return (
    <Card
      title="Personal Information"
      subtitle="Tell us a bit about yourself"
      className="animate-slide-up"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Age"
          type="number"
          required
          min={18}
          max={65}
          value={formData.age || ''}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
          error={errors.age}
          helperText="You must be between 18 and 65 years old"
        />

        <Select
          label="Employment Status"
          required
          options={EMPLOYMENT_STATUS_OPTIONS}
          value={formData.employmentStatus || ''}
          onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value as PersonalInfo['employmentStatus'] })}
          error={errors.employmentStatus}
          
        />

        <Input
          label="Employment Duration (months)"
          type="number"
          required
          min={0}
          value={formData.employmentDuration || ''}
          onChange={(e) => setFormData({ ...formData, employmentDuration: parseInt(e.target.value) })}
          error={errors.employmentDuration}
          helperText="How long have you been employed at your current job?"
        />

        <div className="pt-4">
          <Button type="submit" fullWidth size="lg">
            Continue
          </Button>
        </div>
      </form>
    </Card>
  );
};
