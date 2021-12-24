import { ResponsiveStyleValue, SystemStyleObject } from '@styled-system/css';
import * as React from 'react';
import * as StyledComponents from 'styled-components';
import * as StyledSystem from 'styled-system';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface BaseProps extends React.RefAttributes<any> {
    as?: React.ElementType | undefined;
    css?:
    | StyledComponents.CSSObject
    | StyledComponents.FlattenSimpleInterpolation
    | string
    | undefined;
}

/**
 * The `SxStyleProp` extension `SystemStyleObject` and `Emotion` [style props](https://emotion.sh/docs/object-styles)
 * such that properties that are part of the `Theme` will be transformed to
 * their corresponding values. Other valid CSS properties are also allowed.
 */
export type SxStyleProp =
    | SystemStyleObject
    | Record<
    string,
    | SystemStyleObject
    | ResponsiveStyleValue<number | string>
    | Record<string, SystemStyleObject | ResponsiveStyleValue<number | string>>
    >;

export interface SxProps {
    /**
     * The sx prop lets you style elements inline, using values from your theme.
     */
    sx?: SxStyleProp | undefined;
}

interface BoxKnownProps
    extends BaseProps,
    StyledSystem.SpaceProps,
    StyledSystem.LayoutProps,
    StyledSystem.TypographyProps,
    StyledSystem.ColorProps,
    StyledSystem.FlexboxProps,
    StyledSystem.PositionProps,
    StyledSystem.BorderProps,
    StyledSystem.BackgroundProps,
    SxProps {
    variant?: StyledSystem.ResponsiveValue<string> | undefined;
    tx?: string | undefined;
}
export interface BoxProps
    extends BoxKnownProps,
    Omit<React.HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {}

interface ButtonKnownProps
    extends BoxKnownProps,
    StyledSystem.FontWeightProps,
    StyledSystem.ButtonStyleProps {}
export interface ButtonProps
    extends ButtonKnownProps,
    Omit<React.HTMLProps<HTMLButtonElement>, keyof ButtonKnownProps> {}

export interface CardProps
    extends BoxKnownProps,
    Omit<React.HTMLProps<HTMLDivElement>, keyof BoxKnownProps> {}

// tslint:disable-next-line no-empty-interface
interface FlexKnownProps extends BoxKnownProps {}
export interface FlexProps
    extends FlexKnownProps,
    Omit<React.HTMLProps<HTMLDivElement>, keyof FlexKnownProps> {}

export interface ImageProps
    extends BoxKnownProps,
    Omit<React.HTMLProps<HTMLImageElement>, keyof BoxKnownProps> {}

// tslint:disable-next-line no-empty-interface
interface LinkKnownProps extends BoxKnownProps {}
export interface LinkProps
    extends LinkKnownProps,
    Omit<React.HTMLProps<HTMLAnchorElement>, keyof LinkKnownProps> {}

// tslint:disable-next-line no-empty-interface
interface TextKnownProps extends BoxKnownProps {}
export interface TextProps
    extends TextKnownProps,
    Omit<React.HTMLProps<HTMLDivElement>, keyof TextKnownProps> {}

export interface HeadingProps
    extends TextKnownProps,
    Omit<React.HTMLProps<HTMLHeadingElement>, keyof TextKnownProps> {}

// import * as React from 'react';
// import * as Rebass from 'rebass';
// import * as StyledSystem from 'styled-system';

// export {};

// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

// interface BoxKnownProps
//     extends Rebass.BaseProps,
//         StyledSystem.SpaceProps,
//         StyledSystem.LayoutProps,
//         StyledSystem.FontSizeProps,
//         StyledSystem.FontWeightProps,
//         StyledSystem.ColorProps,
//         StyledSystem.FlexProps,
//         StyledSystem.OrderProps,
//         StyledSystem.AlignSelfProps,
//         Rebass.SxProps {
//     variant?: StyledSystem.ResponsiveValue<string> | undefined;
//     tx?: string | undefined;
// }

// interface LabelKnownProps
//     extends BoxKnownProps,
//         StyledSystem.FlexWrapProps,
//         StyledSystem.FlexDirectionProps,
//         StyledSystem.AlignItemsProps,
//         StyledSystem.JustifyContentProps {}

// export interface LabelProps
//     extends LabelKnownProps,
//         Omit<React.LabelHTMLAttributes<HTMLLabelElement>, keyof LabelKnownProps> {}

// export const Label: React.ComponentType<LabelProps>;

// export interface InputProps
//     extends BoxKnownProps,
//         Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BoxKnownProps> {}

// export const Input: React.ComponentType<InputProps>;

// export interface SelectProps
//     extends BoxKnownProps,
//         Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof BoxKnownProps> {}

// export const Select: React.ComponentType<SelectProps>;

// export interface TextareaProps
//     extends BoxKnownProps,
//         Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof BoxKnownProps> {}

// export const Textarea: React.ComponentType<TextareaProps>;

// export interface RadioProps
//     extends BoxKnownProps,
//         Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BoxKnownProps> {}

// export const Radio: React.ComponentType<RadioProps>;

// export interface SliderProps
//     extends BoxKnownProps,
//         Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BoxKnownProps> {}

// export const Slider: React.ComponentType<SliderProps>;

// export interface CheckboxProps
//     extends BoxKnownProps,
//         Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BoxKnownProps> {}

// export const Checkbox: React.ComponentType<CheckboxProps>;

// export interface SwitchProps
//     extends BoxKnownProps,
//         Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BoxKnownProps> {
//     checked?: boolean | undefined;
// }

// export const Switch: React.ComponentType<SwitchProps>;

// type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
// type ClockProps = BoxProps & Overwrite<ClockDataType, { id?: string }>;
