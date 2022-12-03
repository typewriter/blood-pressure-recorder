import "./App.css";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  max: string;
  min: string;
  pulseRate: string;
};

function App() {
  const { register, handleSubmit } = useForm<Inputs>();

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

  return (
    <Box>
      <Heading>血圧を記録する</Heading>
      <Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <HStack>
              <FormLabel>最高</FormLabel>
              <NumberInput
                size="lg"
                max={200}
                min={100}
                keepWithinRange={false}
                clampValueOnBlur={false}
              >
                <NumberInputField autoFocus={true} {...register("max")} />
              </NumberInput>
            </HStack>
          </FormControl>
          <FormControl>
            <HStack>
              <FormLabel>最低</FormLabel>
              <NumberInput
                size="lg"
                max={150}
                min={50}
                keepWithinRange={false}
                clampValueOnBlur={false}
              >
                <NumberInputField {...register("min")} />
              </NumberInput>
            </HStack>
          </FormControl>
          <FormControl>
            <HStack>
              <FormLabel>脈拍</FormLabel>
              <NumberInput
                size="lg"
                max={100}
                min={50}
                keepWithinRange={false}
                clampValueOnBlur={false}
              >
                <NumberInputField {...register("pulseRate")} />
              </NumberInput>
            </HStack>
          </FormControl>
          <Button leftIcon={<CheckIcon />} type="submit">
            記録
          </Button>
        </form>
      </Flex>
    </Box>
  );
}

export default App;
