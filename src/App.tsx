import "./App.css";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

type Inputs = {
  max: string;
  min: string;
  pulseRate: string;
};

function App() {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>();
  const toast = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const d = new Date();
    await fetch(import.meta.env.VITE_RECORDER_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        max: data.max,
        min: data.min,
        pulse_rate: data.pulseRate,
        date: `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
          .getDate()
          .toString()
          .padStart(2, "0")}`,
        time: `${d.getHours()}${d.getMinutes().toString().padStart(2, "0")}`,
      }),
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setFocus("max");
      reset();
      toast({
        title: "記録しました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Box>
      <Heading>血圧を記録する</Heading>
      <Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <HStack>
              <FormLabel>最高</FormLabel>
              <Input
                type="number"
                size="lg"
                autoFocus={true}
                {...register("max")}
              />
            </HStack>
          </FormControl>
          <FormControl>
            <HStack>
              <FormLabel>最低</FormLabel>
              <Input type="number" size="lg" {...register("min")} />
            </HStack>
          </FormControl>
          <FormControl>
            <HStack>
              <FormLabel>脈拍</FormLabel>
              <Input type="number" size="lg" {...register("pulseRate")} />
            </HStack>
          </FormControl>
          <Button
            isLoading={isSubmitting}
            loadingText="記録中..."
            leftIcon={<CheckIcon />}
            type="submit"
          >
            記録
          </Button>
        </form>
      </Flex>
    </Box>
  );
}

export default App;
