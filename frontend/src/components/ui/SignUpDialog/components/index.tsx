import { Button } from '@/components/common/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/Dialog';
import * as z from 'zod';
import { step1Schema, step2Schema, step3Schema } from '../hooks/useValidate';
import { useState } from 'react';
import { Step1 } from './step1';
import { Step2 } from './step2';
import { Progress } from '@/components/common/Progress';
import { Text } from '@/components/common/Text';
import { AgeGroup } from '@/types/prisma';
import { AnimatePresence, motion } from 'framer-motion';
import { UserField } from '../types/field';
import { slideVariants } from '../animations/slideVariants';
import { Level } from '@/constants/level';
import { Step3 } from './step3';
import { Step4 } from './step4';
import { Complete } from './complete';

export const SignUpDialog = () => {
  const [fields, setFields] = useState<UserField>({});
  const [stepNum, setStepNum] = useState<number>(1);
  const [previousStepNum, setPreviousStepNum] = useState(0);

  const updateStepNum = (newStepNum: number) => {
    setStepNum((prev) => {
      setPreviousStepNum(prev);
      return newStepNum;
    });
  };

  const handleNextForStep1 = (values: z.infer<typeof step1Schema>) => {
    setFields({
      ...fields,
      username: values.username,
      email: values.email,
      password: values.password,
    });
    updateStepNum(2);
  };

  const handleNextForStep2 = (values: z.infer<typeof step2Schema>) => {
    setFields({
      ...fields,
      ageGroup: values.ageGroup as AgeGroup,
    });
    updateStepNum(3);
  };

  const handleNextForStep3 = (values: z.infer<typeof step3Schema>) => {
    setFields({
      ...fields,
      level: values.level as Level,
    });
    updateStepNum(4);
  };

  const onRegistration = (uploadImage: File | null) => {
    console.log('登録完了');
    updateStepNum(5);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" color="" variant="link">
          メンバー登録
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[400px] overflow-hidden`}>
        <DialogHeader>
          <DialogTitle className="mb-1">メンバー登録</DialogTitle>
          <DialogDescription>
            4ステップを入力して、いますぐ英日記を始めましょう
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Progress value={(stepNum - 1) * 25} />
          <p className="flex justify-end items-end w-10">
            <Text className="font-bold text-primary text-2xl">
              {stepNum - 1}
            </Text>
            <Text>/4</Text>
          </p>
        </div>
        <AnimatePresence mode="popLayout">
          {stepNum === 1 && (
            <motion.div
              key="step1"
              custom={stepNum > previousStepNum ? -1 : 1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 25 },
                opacity: { duration: 0 },
              }}
            >
              <Step1 defaultValues={fields} onNextStep={handleNextForStep1} />
            </motion.div>
          )}
          {stepNum === 2 && (
            <motion.div
              key="step2"
              custom={stepNum > previousStepNum ? -1 : 1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 25 },
                opacity: { duration: 0 },
              }}
            >
              <Step2
                defaultValues={fields}
                onNextStep={handleNextForStep2}
                onBackStep={() => updateStepNum(1)}
              />
            </motion.div>
          )}
          {stepNum === 3 && (
            <motion.div
              key="step3"
              custom={stepNum > previousStepNum ? -1 : 1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 25 },
                opacity: { duration: 0 },
              }}
            >
              <Step3
                defaultValues={fields}
                onNextStep={handleNextForStep3}
                onBackStep={() => updateStepNum(2)}
              />
            </motion.div>
          )}
          {stepNum === 4 && (
            <motion.div
              key="step4"
              custom={stepNum > previousStepNum ? -1 : 1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 25 },
                opacity: { duration: 0 },
              }}
            >
              <Step4
                onRegistration={onRegistration}
                onBackStep={() => updateStepNum(3)}
              />
            </motion.div>
          )}
          {stepNum === 5 && (
            <motion.div
              key="step5"
              custom={stepNum > previousStepNum ? -1 : 1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 25 },
                opacity: { duration: 0 },
              }}
            >
              <Complete />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
