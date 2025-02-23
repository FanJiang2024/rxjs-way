### About Image Components in Nextjs

- 1、handle image loads failed:

```jsx
// use the smaller image as a primary image.
import img from "@pulic/a.webp";

// use the original-formatting image for the backup.
import imgBak from "@public/a.png";

const Page = () => {
  const [image, setImage] = useState(img);
  const counterRef = useRef(0);

  return (
    <>
      <Image
        src={image}
        alt={"image"}
        // tailwindcss
        class='object-fit object-center h-auto'
        style={{ width: "200px", height: "200px" }}
        width={200}
        height={150}
        onError={(e) => {
          if(counterRef.current < 3) {
            setImage(imgBak)
          } else {
            // post error msg
          }
        }}
      />
    </>
  );
};
```

not finished ...
