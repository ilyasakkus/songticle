interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export function Image({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  ...props
}: ImageProps) {
  const style = fill
    ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }
    : {};

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${fill ? 'object-cover' : ''}`}
      style={style}
      {...props}
    />
  );
}
