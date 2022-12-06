import classNames from "classnames";
import { motion } from "framer-motion";
import CurvedShape from "@common/components/CurvedShape";

interface IShapedImageProps {
  src: string;
  className?: string;
}

const ShapedImage = ({ src, className }: IShapedImageProps) => {
  return (
    <div className={classNames("shaped-graphic relative", className)}>
      <div className="absolute z-10 w-full mt-8">
        <motion.img
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          src={src}
          className="mx-auto"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CurvedShape
          type={1}
          color={["#3a38c0", "#9577f9"]}
          width={"350px"}
          height={"300px"}
          className="z-0 mx-auto"
        />
      </motion.div>
    </div>
  );
};

export default ShapedImage;
