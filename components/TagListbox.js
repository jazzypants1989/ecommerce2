import { useState } from "react";
import { Listbox } from "@headlessui/react";

const TagListbox = (props) => {
  let { products } = props;
  let tags = products.map((product) => product.tag);

  const [selectedTag, setSelectedTag] = useState(tags[0]);

  return (
    <Listbox value={selectedTag} onChange={setSelectedTag}>
      <Listbox.Button>{selectedTag.name}</Listbox.Button>
      <Listbox.Options>
        {tags.map((tag, index) => (
          <Listbox.Option key={index} value={tag} disabled={tag.unavailable}>
            {tag.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default TagListbox;
