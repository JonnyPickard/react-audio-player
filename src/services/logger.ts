import { Logger } from "tslog";

export interface LoggerProps {
  debug?: boolean;
  name: string;
}

export const logger = ({ debug, name }: LoggerProps) => {
  const tsLog = new Logger({
    type: debug ? "pretty" : "hidden",
    name,
  });

  const log = ({
    fn,
    message,
  }: {
    /** The function that is logging */
    fn: string;
    /** The log message */
    message: string;
  }) => {
    tsLog.debug(`${fn}: ${message}`);
  };

  return { log };
};
