import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/Form';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/common/RadioGroup/radio-group';
import { AgeGroup, ageGroup } from '@/constants/ageGroup';
import { Label } from '@/components/common/Label';
import { step2Schema, useValiateForStep2 } from '../hooks/useValidate';
import { z } from 'zod';
import { Button } from '@/components/common/Button';
import { UserField } from '../types/field';
import { useEffect } from 'react';

interface Props {
  defaultValues: UserField;
  onBackStep: () => void;
  onNextStep: (values: z.infer<typeof step2Schema>) => void;
}

export const Step2 = ({ defaultValues, onBackStep, onNextStep }: Props) => {
  const form = useValiateForStep2();

  const onSubmit = (values: z.infer<typeof step2Schema>) => {
    onNextStep(values);
  };

  useEffect(() => {
    form.setValue('ageGroup', defaultValues.ageGroup ?? '');
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="ageGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">あなたの年齢層は？</FormLabel>
              <FormDescription className="pb-2">
                あなたの年齢層に合わせて英日記のフィードバックを最適化します。
              </FormDescription>
              <FormControl>
                <RadioGroup {...field} onValueChange={(e) => field.onChange(e)}>
                  {Object.keys(ageGroup).map((key) => (
                    <div key={key} className="flex items-center space-x-2 mb-1">
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key}>{ageGroup[key as AgeGroup]}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onBackStep}>
            前へ戻る
          </Button>
          <Button
            type="submit"
            disabled={Object.keys(form.formState.errors).length > 0}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            次へ進む
          </Button>
        </div>
      </form>
    </Form>
  );
};
