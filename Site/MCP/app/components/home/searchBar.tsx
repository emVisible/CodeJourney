"use client";
import { Box, Chip, InputAdornment, TextField, styled } from "@mui/material";
import { useState, useRef, useEffect, ChangeEventHandler } from "react";
const TagsContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

const TagsInputContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 8,
  width: "100%",
  minHeight: 56,
  padding: "6px 16px",
  paddingLeft: "32px",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "42px",
  "&:hover": {
    borderColor: "rgba(0, 0, 0, 0.87)",
  },
  "&.Mui-focused": {
    borderColor: "#1976d2",
    borderWidth: 2,
  },
});

const SearchInput = styled("input")({
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: "1rem",
  fontFamily: "inherit",
  backgroundColor: "transparent",
});

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState([
    "server",
    "client",
    "mcp",
    "mcp-server",
    "agent",
    "nodejs",
    "python",
  ]);
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: any) => setInputValue(e.target.value);
  const junmpToMore = (e: any) => {};

  const handleInputKeyDown = (e: any) => {
    if (e.key === "Enter" && inputValue.trim()) {
      // 添加新标签或搜索
      if (inputValue.startsWith("#")) {
        const newTag = inputValue.slice(1);
        if (!selectedTags.includes(newTag)) {
          setSelectedTags([...selectedTags, newTag]);
        }
      } else {
        handleSearch();
      }
      setInputValue("");
    } else if (
      e.key === "Backspace" &&
      !inputValue &&
      selectedTags.length > 0
    ) {
      // 删除最后一个标签
      setSelectedTags(selectedTags.slice(0, -1));
    }
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagDelete = (tagToDelete: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToDelete));
  };

  const handleSearch = () => {
    const searchQuery =
      selectedTags.map((tag) => `#${tag}`).join(" ") +
      (inputValue ? ` ${inputValue}` : "");
    console.log("搜索内容:", searchQuery);
    // 这里添加你的搜索逻辑
  };

  const handleContainerClick = () => {
    inputRef.current?.focus()!;
  };

  return (
    <section className="w-[320px] md:w-[480px] lg:w-[640px] xl:w-[900px] h-28 mt-[280px] sm:mt-[320px] md:mt-[360px] lg:mt-[320px] xl:mt-[280px] flex flex-col justify-center items-center">
      <TagsInputContainer
        ref={containerRef}
        onClick={handleContainerClick}
        sx={{
          "&.Mui-focused": {
            borderColor: "primary.main",
            borderWidth: 2,
          },
        }}
      >
        {selectedTags.map((tag, index) => (
          <Chip
            key={index}
            label={`# ${tag}`}
            onDelete={() => handleTagDelete(tag)}
            sx={{
              borderRadius: 8,
              paddingLeft: "8px",
              paddingRight: "8px",
              height: 32,
              "& .MuiChip-label": {
                // padding: "0",
                // display: "flex",
                // alignItems: "center",
              },
            }}
          />
        ))}
        <SearchInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={
            selectedTags.length === 0 ? "Search with keywords..." : ""
          }
        />
        <InputAdornment position="start">
          <img src="/search.svg" alt="" style={{ width: 16, height: 16 }} />
        </InputAdornment>
      </TagsInputContainer>

      <section
        style={{ width: "100%" }}
        className="pt-7 gap-5 mt-8 overflow-hidden hidden sm:flex"
      >
        <TagsContainer className="w-full flex justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {availableTags.map((tag, index) => (
              <Chip
                key={index}
                label={`# ${tag}`}
                variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                color={selectedTags.includes(tag) ? "primary" : "default"}
                clickable
                onClick={() => handleTagClick(tag)}
                sx={{
                  borderRadius: 8,
                  paddingLeft: "8px",
                  paddingRight: "8px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                  height: "20px",
                  "& .MuiChip-label": {
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              />
            ))}
          </div>
          <div>
            <Chip
              key={"more"}
              variant={"outlined"}
              color={"default"}
              label={
                <div className="flex justify-center items-center ">
                  <div className="pr-1">more</div>
                  <img src="/more.png" alt="" />
                </div>
              }
              clickable
              onClick={() => junmpToMore("")}
              sx={{
                borderRadius: 8,
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "3px",
                paddingBottom: "3px",
                height: "20px",
                "& .MuiChip-label": {
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                },
              }}
            />
          </div>
        </TagsContainer>
      </section>
    </section>
  );
};

export default SearchBar;
