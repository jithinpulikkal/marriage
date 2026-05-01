import { cloneElement, isValidElement } from "react";
import useInView from "../hooks/useInView.js";

const animationClasses = {
    fadeUp: "motion-safe:animate-fadeUp",
    fadeIn: "motion-safe:animate-fadeIn",
    fadeInSlow: "motion-safe:animate-fadeInSlow",
    scaleIn: "motion-safe:animate-scaleIn"
};

const hiddenClasses = {
    fadeUp: "motion-safe:opacity-0 motion-safe:translate-y-4",
    fadeIn: "motion-safe:opacity-0",
    fadeInSlow: "motion-safe:opacity-0",
    scaleIn: "motion-safe:opacity-0 motion-safe:scale-95"
};

export default function Reveal({ children, className = "", animation = "fadeUp", asChild = false }) {
    const [ref, isVisible] = useInView();
    const showClass = animationClasses[animation] || animationClasses.fadeUp;
    const hideClass = hiddenClasses[animation] || hiddenClasses.fadeUp;
    const classes = `${className} ${isVisible ? showClass : hideClass}`.trim();

    if (asChild && isValidElement(children)) {
        const childClassName = children.props.className || "";
        return cloneElement(children, {
            ref,
            className: `${childClassName} ${classes}`.trim(),
        });
    }

    return (
        <div ref={ref} className={classes}>
            {children}
        </div>
    );
}
