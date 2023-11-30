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
import { Label } from '@/components/common/Label';
import { step3Schema, useValiateForStep3 } from '../hooks/useValidate';
import { z } from 'zod';
import { Button } from '@/components/common/Button';
import { Level, level } from '@/constants/level';
import { useEffect } from 'react';
import { UserField } from '../types/field';

interface Props {
  defaultValues: UserField;
  onBackStep: () => void;
  onNextStep: (values: z.infer<typeof step3Schema>) => void;
}

export const Step3 = ({ defaultValues, onBackStep, onNextStep }: Props) => {
  const form = useValiateForStep3();

  const onSubmit = (values: z.infer<typeof step3Schema>) => {
    onNextStep(values);
  };

  useEffect(() => {
    form.setValue('level', defaultValues.level ?? '');
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">
                あなたの英語レベルは？
              </FormLabel>
              <FormDescription className="pb-2">
                あなたの英語レベルに合わせて英日記のフィードバックを最適化します。
              </FormDescription>
              <FormControl>
                <RadioGroup {...field} onValueChange={(e) => field.onChange(e)}>
                  {Object.keys(level).map((key) => (
                    <div key={key} className="flex items-center space-x-2 mb-1">
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key} className="leading-5 cursor-pointer">
                        {level[key as Level]}
                      </Label>
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
