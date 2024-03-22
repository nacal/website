import NextLink from 'next/link';
import { ColorsHeader } from '@components/ColorsHeader';
import { ColorsMobileMenu } from '@components/ColorsMobileMenu';
import { MobileMenuProvider } from '@components/MobileMenu';
import swatchStyles from '@components/Swatch.module.css';
import { TitleAndMetaTags } from '@components/TitleAndMetaTags';
import {
  BoxIcon,
  GridIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  TextIcon,
  ImageIcon,
  PlusIcon,
  FrameIcon,
  CrumpledPaperIcon,
  ScissorsIcon,
  Component1Icon,
  TokensIcon,
  FontFamilyIcon,
  LightningBoltIcon,
  ChevronDownIcon,
  StarIcon,
  AccessibilityIcon,
  BookmarkIcon,
  HeartIcon,
  Share2Icon,
  GitHubLogoIcon,
  CopyIcon,
  FigmaLogoIcon,
  CheckIcon,
  ArrowLeftIcon,
} from '@radix-ui/react-icons';
import {
  Avatar,
  Badge,
  Blockquote,
  Box,
  Button,
  Callout,
  Card,
  Checkbox,
  Container,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  HoverCard,
  IconButton,
  Inset,
  Link,
  Reset,
  Section,
  Separator,
  Strong,
  Switch,
  Tabs,
  Text,
  TextField,
  Theme,
  Tooltip,
  VisuallyHidden,
} from '@radix-ui/themes';
import * as React from 'react';
import styles from './create.module.css';
import { getPeopleForColor } from '@utils/people';
import { ThemesPanelBackgroundImage } from '@components/ThemesPanelBackgroundImage';
import { AvatarIconFallback } from '@components/AvatarIconFallback';
import { StepLabel, UsageRange } from './index';
import { ColorField } from '@components/ColorField';
import { generateRadixColors } from '@components/generateRadixColors';
import Head from 'next/head';
import { classNames } from '@utils/classNames';
import { Swatch } from '@components/Swatch';
import { useLocalStorage, useIsomorphicLayoutEffect } from 'usehooks-ts';
import { useTheme } from 'next-themes';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

// TODO fix selectiion colors on gray elements

export default function Page() {
  // TODODODO get accent name
  const accent = 'indigo';

  const { resolvedTheme } = useTheme();

  const [lightAccentValue, setLightAccentValue] = useLocalStorage('create/light/accent', '#3D63DD');
  const [lightGrayValue, setLightGrayValue] = useLocalStorage('create/light/gray', '#8B8D98');

  const [darkAccentValue, setDarkAccentValue] = useLocalStorage('create/dark/accent', '#3D63DD');
  const [darkGrayValue, setDarkGrayValue] = useLocalStorage('create/dark/gray', '#8B8D98');

  const accentValue = resolvedTheme === 'dark' ? darkAccentValue : lightAccentValue;
  const grayValue = resolvedTheme === 'dark' ? darkGrayValue : lightGrayValue;

  const setAccentValue = resolvedTheme === 'dark' ? setDarkAccentValue : setLightAccentValue;
  const setGrayValue = resolvedTheme === 'dark' ? setDarkGrayValue : setLightGrayValue;

  const lightModeResult = generateRadixColors({
    appearance: 'light',
    accent: lightAccentValue,
    gray: lightGrayValue,
  });

  const darkModeResult = generateRadixColors({
    appearance: 'dark',
    accent: darkAccentValue,
    gray: darkGrayValue,
  });

  const [codeCopied, setCodeCopied] = React.useState(false);
  const [svgCopied, setSvgCopied] = React.useState(false);
  const copiedTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
  const COPIED_TIMEOUT = 3000;

  const [hydrated, setHydrated] = React.useState(false);
  useIsomorphicLayoutEffect(() => setHydrated(true), []);

  if (!hydrated) {
    return null;
  }

  return (
    <MobileMenuProvider>
      <Box
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 480,
          opacity: 0.6,
          background: 'linear-gradient(to bottom, var(--accent-4), transparent)',
        }}
      />

      <ColorsHeader ghost />
      <ColorsMobileMenu />

      <TitleAndMetaTags
        title="Create your palette – Radix Colors"
        description="An open-source color system for designing beautiful, accessible websites and apps."
        image="colors.png"
      />

      <Head>
        <style>
          {getPreviewStyles({
            selector: `.radix-themes`,
            lightColors: lightModeResult,
            darkColors: darkModeResult,
          })}
        </style>
      </Head>

      <Section px={{ initial: '5', xs: '6', sm: '7', md: '9' }} size={{ initial: '2', md: '3' }}>
        <Container position="relative">
          <Flex direction="column" align="center" gap="3">
            <Flex asChild align="center" gap="1">
              <Link asChild size="2" color="gray" ml="-2">
                <NextLink href="/colors">
                  <ArrowLeftIcon />
                  Radix Colors
                </NextLink>
              </Link>
            </Flex>
            <Heading as="h1" align="center" size="8" mb="8">
              Create your palette
            </Heading>
          </Flex>

          <Box mb="9">
            <Grid flow="column" columns="220px 220px" gap="4" justify="center" align="end">
              <Flex direction="column">
                <Flex>
                  <Text as="label" htmlFor="accent" size="1" color="gray" mb="1">
                    Accent
                  </Text>
                </Flex>
                <ColorField id="accent" value={accentValue} onValueChange={setAccentValue} />
              </Flex>

              <Flex direction="column">
                <Flex>
                  <Text as="label" htmlFor="gray" size="1" color="gray" mb="1">
                    Gray
                  </Text>
                </Flex>
                <ColorField id="gray" value={grayValue} onValueChange={setGrayValue} />
              </Flex>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button>
                    Save
                    <Box asChild mx="-1">
                      <ChevronDownIcon />
                    </Box>
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item
                    onSelect={() => {
                      setCodeCopied(true);
                      setSvgCopied(false);
                      clearTimeout(copiedTimeoutRef.current);
                      copiedTimeoutRef.current = setTimeout(() => {
                        setCodeCopied(false);
                      }, COPIED_TIMEOUT);
                    }}
                  >
                    <Flex align="center" gap="2">
                      <Box asChild ml="-1">
                        <CopyIcon />
                      </Box>
                      Copy CSS code
                    </Flex>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onSelect={() => {
                      setSvgCopied(true);
                      setCodeCopied(false);
                      clearTimeout(copiedTimeoutRef.current);
                      copiedTimeoutRef.current = setTimeout(() => {
                        setSvgCopied(false);
                      }, COPIED_TIMEOUT);
                    }}
                  >
                    <Flex align="center" gap="2">
                      <Box asChild ml="-1">
                        <FigmaLogoIcon />
                      </Box>
                      Copy SVG object
                    </Flex>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>

              <Flex
                asChild
                height="6"
                align="center"
                justify="start"
                gap="1"
                style={{
                  whiteSpace: 'nowrap',
                  width: 100,
                  marginRight: -116,
                }}
              >
                <Text size="2">
                  {(codeCopied || svgCopied) && (
                    <>
                      <CheckIcon width="18" height="18" />
                      {svgCopied ? 'SVG ' : 'CSS '}
                      copied
                    </>
                  )}
                </Text>
              </Flex>
            </Grid>
          </Box>

          <Theme
            accentColor={accent}
            grayColor="gray"
            hasBackground={false}
            className="radix-themes-default-fonts"
            panelBackground="solid"
          >
            <Scales />
            <Preview />
          </Theme>
        </Container>
      </Section>
    </MobileMenuProvider>
  );
}

const Scales = () => (
  <Grid columns="12" gap="1" mb="9">
    <UsageRange style={{ gridColumn: '1 / 3' }}>Backgrounds</UsageRange>
    <UsageRange style={{ gridColumn: '3 / 6' }}>Interactive components</UsageRange>
    <UsageRange style={{ gridColumn: '6 / 9' }}>Borders and separators</UsageRange>
    <UsageRange style={{ gridColumn: '9 / 11' }}>Solid colors</UsageRange>
    <UsageRange style={{ gridColumn: '11 / 13' }}>Accessible text</UsageRange>

    <StepLabel>1</StepLabel>
    <StepLabel>2</StepLabel>
    <StepLabel>3</StepLabel>
    <StepLabel>4</StepLabel>
    <StepLabel>5</StepLabel>
    <StepLabel>6</StepLabel>
    <StepLabel>7</StepLabel>
    <StepLabel>8</StepLabel>
    <StepLabel>9</StepLabel>
    <StepLabel>10</StepLabel>
    <StepLabel>11</StepLabel>
    <StepLabel>12</StepLabel>

    {Array.from({ length: 12 }, (_, i) => i + 1).map((step) => (
      <span
        key={step}
        className={classNames(swatchStyles.SwatchTrigger, swatchStyles.SwatchTransparencyGrid)}
      >
        <span style={{ backgroundColor: `var(--accent-${step})` }}>
          <VisuallyHidden>Step {step}</VisuallyHidden>
        </span>
      </span>
    ))}

    {Array.from({ length: 12 }, (_, i) => i + 1).map((step) => (
      <Swatch key={step} scale="gray" step={step.toString()} />
    ))}
  </Grid>
);

export const Preview = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof Grid>) => {
  const [state, setState] = React.useState({
    todo: [
      { id: 'a', completed: false },
      { id: 'b', completed: false },
      { id: 'c', completed: false },
      { id: 'd', completed: true },
      { id: 'e', completed: true },
    ],
  });

  return (
    <Grid columns="320px 1fr 320px" gap="6" {...props}>
      <Flex gap="5" direction="column">
        <Flex gap="2">
          <Box flexGrow="1" flexShrink="0">
            <TextField.Root placeholder="Search" type="text" name="_">
              <TextField.Slot>
                <MagnifyingGlassIcon />
              </TextField.Slot>
            </TextField.Root>
          </Box>
          <Button size="2">Submit</Button>
        </Flex>

        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>Please upgrade to the new version.</Callout.Text>
        </Callout.Root>

        <LayersRoot type="single">
          <LayersItem value="1">
            <Flex align="center" justify="center" width="4" height="4">
              <BoxIcon />
            </Flex>
            <Text size="1">Box</Text>
          </LayersItem>
          <LayersItem value="2">
            <Flex align="center" justify="center" width="4" height="4">
              <GridIcon />
            </Flex>
            <Text size="1">Grid</Text>
          </LayersItem>
          <LayersItem data-indent="1" value="3">
            <Flex align="center" justify="center" width="4" height="4">
              <ImageIcon />
            </Flex>
            <Text size="1">Image</Text>
          </LayersItem>
          <LayersItem data-indent="1" value="4">
            <Flex align="center" justify="center" width="4" height="4">
              <ImageIcon />
            </Flex>
            <Text size="1">Image</Text>
          </LayersItem>
          <LayersItem data-indent="1" value="5">
            <Flex align="center" justify="center" width="4" height="4">
              <TextIcon />
            </Flex>
            <Text size="1">Text</Text>
          </LayersItem>
        </LayersRoot>

        <Flex justify="between" align="center">
          <Badge radius="full" variant="soft">
            Fully-featured
          </Badge>
          <Badge radius="full" variant="surface">
            Built with Radix
          </Badge>
          <Badge radius="full" variant="outline">
            Open source
          </Badge>
        </Flex>

        <Flex align="center" gap="1" justify="between">
          <IconButton variant="classic">
            <Flex align="center" justify="center" width="4" height="4">
              <StarIcon />
            </Flex>
          </IconButton>
          <IconButton variant="solid">
            <Flex align="center" justify="center" width="4" height="4">
              <BookmarkIcon />
            </Flex>
          </IconButton>
          <IconButton variant="soft">
            <Flex align="center" justify="center" width="4" height="4">
              <AccessibilityIcon />
            </Flex>
          </IconButton>
          <IconButton variant="surface">
            <Flex align="center" justify="center" width="4" height="4">
              <HeartIcon />
            </Flex>
          </IconButton>
          <IconButton variant="outline">
            <Flex align="center" justify="center" width="4" height="4">
              <Share2Icon />
            </Flex>
          </IconButton>
          <Switch size="1" ml="2" />
          <Switch size="1" defaultChecked />
        </Flex>

        <Flex direction="column" gap="4">
          <Card asChild variant="classic" size="2">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <Flex align="center" gap="3">
                <Avatar size="4" src={getPeopleForColor('gray')[0].image} fallback="V" />
                <Box>
                  <Text as="div" weight="medium" size="3">
                    Emily Adams
                  </Text>

                  <Text as="div" color="gray" size="2">
                    emily.adams@example.com
                  </Text>
                </Box>
              </Flex>
            </a>
          </Card>

          <Card asChild variant="surface" size="2">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <Flex align="center" gap="3">
                <Avatar size="4" src={getPeopleForColor('gray')[0].image} fallback="V" />
                <Box>
                  <Text as="div" weight="medium" size="3">
                    Emily Adams
                  </Text>

                  <Text as="div" color="gray" size="2">
                    emily.adams@example.com
                  </Text>
                </Box>
              </Flex>
            </a>
          </Card>
        </Flex>
      </Flex>

      <Flex gap="5" direction="column">
        <Flex gap="4">
          <Flex
            align="center"
            gap="3"
            px="2"
            style={{
              boxShadow: 'inset 0 0 0 1px var(--gray-a6)',
              borderRadius: 'var(--radius-3)',
            }}
          >
            <Tooltip content="Add element">
              <IconButton variant="ghost" highContrast color="gray">
                <Flex width="4" height="4" align="center" justify="center">
                  <PlusIcon />
                </Flex>
              </IconButton>
            </Tooltip>

            <Separator size="1" orientation="vertical" />

            <Tooltip content="Frame">
              <IconButton variant="ghost" highContrast color="gray">
                <Flex width="4" height="4" align="center" justify="center">
                  <FrameIcon />
                </Flex>
              </IconButton>
            </Tooltip>
            <Tooltip content="Rectangle">
              <IconButton variant="ghost" highContrast color="gray">
                <Flex width="4" height="4" align="center" justify="center">
                  <BoxIcon />
                </Flex>
              </IconButton>
            </Tooltip>
            <Tooltip content="Components">
              <IconButton variant="ghost" highContrast color="gray">
                <Flex width="4" height="4" align="center" justify="center">
                  <Component1Icon />
                </Flex>
              </IconButton>
            </Tooltip>
            <Tooltip content="Tokens">
              <IconButton variant="ghost" highContrast color="gray">
                <Flex width="4" height="4" align="center" justify="center">
                  <TokensIcon />
                </Flex>
              </IconButton>
            </Tooltip>

            <Separator size="1" orientation="vertical" />

            <Tooltip content="Text">
              <IconButton variant="ghost" highContrast color="gray">
                <Flex width="4" height="4" align="center" justify="center">
                  <TextIcon />
                </Flex>
              </IconButton>
            </Tooltip>
            <Tooltip content="Typography">
              <IconButton variant="ghost" highContrast color="gray">
                <Flex width="4" height="4" align="center" justify="center">
                  <FontFamilyIcon />
                </Flex>
              </IconButton>
            </Tooltip>
            <Tooltip content="Fill with AI">
              <IconButton variant="ghost" highContrast color="gray">
                <Flex width="4" height="4" align="center" justify="center">
                  <LightningBoltIcon />
                </Flex>
              </IconButton>
            </Tooltip>

            <Separator size="1" orientation="vertical" />

            <Tooltip content="Scissors">
              <IconButton variant="ghost" highContrast color="gray">
                <Flex width="4" height="4" align="center" justify="center">
                  <ScissorsIcon />
                </Flex>
              </IconButton>
            </Tooltip>
            <Tooltip content="Archive">
              <IconButton variant="ghost" highContrast color="gray">
                <Flex width="4" height="4" align="center" justify="center">
                  <CrumpledPaperIcon />
                </Flex>
              </IconButton>
            </Tooltip>
          </Flex>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Box flexGrow="1" asChild>
                <Button size="2" variant="surface" color="gray" highContrast>
                  Actions
                  <DropdownMenu.TriggerIcon />
                </Button>
              </Box>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Group>
                <DropdownMenu.Item shortcut="⌘ C">Copy</DropdownMenu.Item>
                <DropdownMenu.Item shortcut="⌘ V">Paste</DropdownMenu.Item>
                <DropdownMenu.Item shortcut="⇧ ⌘ R">Paste to replace</DropdownMenu.Item>
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>Layers</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item shortcut="⇧ ⌘ ]">Move to top</DropdownMenu.Item>
                  <DropdownMenu.Item shortcut="⌘ ]">Move up</DropdownMenu.Item>
                  <DropdownMenu.Item shortcut="⌘ [">Move down</DropdownMenu.Item>
                  <DropdownMenu.Item shortcut="⇧ ⌘ [">Move to bottom</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>Boolean groups</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>Union</DropdownMenu.Item>
                  <DropdownMenu.Item>Subtract</DropdownMenu.Item>
                  <DropdownMenu.Item>Intersect</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item shortcut="⌘ E">Merge</DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>

        <Flex direction="column">
          <Flex direction="column" position="relative" px="8" py="7">
            <Flex
              align="center"
              justify="center"
              position="absolute"
              inset="0"
              style={{
                overflow: 'hidden',
                borderRadius: 'var(--radius-3)',
                background: 'var(--gray-2)',
              }}
            >
              <ThemesPanelBackgroundImage id="1" style={{ width: '240%', marginLeft: '70%' }} />
            </Flex>

            <Box position="relative">
              <Heading align="center" as="h3" size="6" mb="4">
                Sign up
              </Heading>

              <Card size="4">
                <Flex direction="column" mb="5">
                  <Flex>
                    <Text
                      htmlFor="example-name"
                      as="label"
                      size="2"
                      weight="medium"
                      mb="1"
                      trim="start"
                    >
                      Full name
                    </Text>
                  </Flex>
                  <TextField.Root id="example-name" placeholder="Enter your name" />
                </Flex>

                <Flex direction="column" mb="5">
                  <Flex>
                    <Text htmlFor="example-email" as="label" size="2" weight="medium" mb="1">
                      Email
                    </Text>
                  </Flex>
                  <TextField.Root id="example-email" placeholder="Enter your email address" />
                </Flex>

                <Flex direction="column" mb="5">
                  <Flex>
                    <Text htmlFor="example-password" as="label" size="2" weight="medium" mb="1">
                      Password
                    </Text>
                  </Flex>
                  <TextField.Root id="example-password" placeholder="Enter your password" />
                </Flex>

                <Grid
                  mt="5"
                  gap="4"
                  style={{ '--cursor-button': 'pointer' } as React.CSSProperties}
                >
                  <Button>Create account</Button>
                  <Flex align="center" gap="3">
                    <Separator size="4" />
                    <Text color="gray" size="1">
                      OR
                    </Text>
                    <Separator size="4" />
                  </Flex>
                  <Button color="gray" variant="surface" highContrast>
                    <GitHubLogoIcon />
                    Continue with GitHub
                  </Button>
                </Grid>
              </Card>
            </Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex gap="6" direction="column">
        <Flex mt="-2">
          <Tabs.Root defaultValue="colors" activationMode="manual">
            <Tabs.List size="2">
              <Tabs.Trigger value="themes">Themes</Tabs.Trigger>
              <Tabs.Trigger value="primitives">Primitives</Tabs.Trigger>
              <Tabs.Trigger value="icons">Icons</Tabs.Trigger>
              <Tabs.Trigger value="colors">Colors</Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </Flex>

        <Flex gap="4" direction="column">
          <Flex gap="3">
            <Avatar
              radius="full"
              variant="solid"
              src={getPeopleForColor('gray')[6].image}
              fallback="V"
            />
            <Avatar
              radius="full"
              variant="solid"
              src={getPeopleForColor('gray')[2].image}
              fallback="V"
            />
            <Avatar radius="full" variant="solid" fallback="V" />
            <Avatar radius="full" variant="solid" fallback="BG" />
            <Avatar radius="full" variant="solid" fallback={<AvatarIconFallback />} />
            <Avatar radius="full" variant="solid" fallback={<AvatarIconFallback />} highContrast />
          </Flex>

          <Flex gap="3">
            <Avatar
              radius="full"
              variant="soft"
              src={getPeopleForColor('gray')[0].image}
              fallback="V"
            />
            <Avatar
              radius="full"
              variant="soft"
              src={getPeopleForColor('gray')[1].image}
              fallback="V"
            />
            <Avatar radius="full" variant="soft" fallback="V" />
            <Avatar radius="full" variant="soft" fallback="BG" />
            <Avatar radius="full" variant="soft" fallback={<AvatarIconFallback />} />
            <Avatar radius="full" variant="soft" fallback={<AvatarIconFallback />} highContrast />
          </Flex>
        </Flex>

        <Separator size="4" />

        <Flex gap="4" direction="column">
          <Text size="2">
            <LinksExample />
          </Text>

          <Text size="2" color="gray">
            <LinksExample />
          </Text>
        </Flex>

        <Box
          p="4"
          style={{
            borderRadius: 'var(--radius-4)',
            // backgroundColor: 'var(--color-panel-solid)',
            backgroundImage: 'linear-gradient(var(--gray-a2), var(--gray-a2))',
          }}
        >
          <ToDoList
            items={state.todo}
            onItemsChange={(items) => setState({ ...state, todo: items })}
          />
        </Box>
      </Flex>
    </Grid>
  );
};

interface ToDoItem {
  id: string;
  completed: boolean;
}

interface ToDoList {
  items: ToDoItem[];
  onItemsChange: (items: ToDoItem[]) => void;
}

const ToDoList = ({ items, onItemsChange }: ToDoList) => {
  return (
    <Flex gap="2" direction="column">
      {items.map((item) => (
        <Text as="label" size="2" key={item.id}>
          <Flex gap="2">
            <Checkbox
              checked={item.completed}
              onCheckedChange={(checked) => {
                const newItems = items.slice();
                const newItem = newItems.find((candidate) => candidate.id === item.id);
                newItem.completed = Boolean(checked);
                onItemsChange(newItems);
              }}
            />
            <Text
              color={item.completed ? 'gray' : undefined}
              style={
                {
                  textDecoration: item.completed ? 'line-through' : undefined,
                  '--accent-12': 'var(--accent-11)',
                } as React.CSSProperties
              }
            >
              {itemsContent[item.id]}
            </Text>
          </Flex>
        </Text>
      ))}
    </Flex>
  );
};

const itemsContent = {
  a: (
    <span>
      Respond to comment{' '}
      <Link underline="hover" onClick={(event) => event.preventDefault()}>
        #384
      </Link>{' '}
      from Travis
    </span>
  ),
  b: (
    <span>
      Invite{' '}
      <Link underline="hover" onClick={(event) => event.preventDefault()}>
        Acme Co.
      </Link>{' '}
      team to Slack
    </span>
  ),
  c: (
    <span>
      Create a report{' '}
      <Link underline="hover" onClick={(event) => event.preventDefault()}>
        requested
      </Link>{' '}
      by Danilo
    </span>
  ),
  d: <span>Close Q2 finances</span>,
  e: (
    <span>
      Review invoice{' '}
      <Link underline="hover" onClick={(event) => event.preventDefault()}>
        #3456
      </Link>
    </span>
  ),
};

const LinksExample = () => (
  <Blockquote>
    Susan Kare is an American{' '}
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Link underline="hover" target="_blank" href="https://en.wikipedia.org/wiki/Graphic_design">
          graphic designer
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Flex>
          <Inset side="left" pr="current">
            <img
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&h=480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Graphic design"
              style={{
                display: 'block',
                objectFit: 'cover',
                height: 160,
                width: 160,
                backgroundColor: 'var(--gray-5)',
                filter: 'contrast(1.05) brightness(1.05)',
              }}
            />
          </Inset>
          <Text as="p" size="2" style={{ maxWidth: 250 }}>
            <Strong>Graphic design</Strong> is a profession and applied art whose activity consists
            in projecting visual communications intended to transmit specific messages to people.
          </Text>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>{' '}
    and artist, who contributed{' '}
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Link underline="hover" target="_blank" href="https://en.wikipedia.org/wiki/User_interface">
          interface
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Flex>
          <Inset side="left" pr="current">
            <img
              src="https://images.unsplash.com/photo-1602576666092-bf6447a729fc?q=80&h=480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A graphical user interface"
              style={{
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'right',
                height: 160,
                width: 160,
                backgroundColor: 'var(--gray-5)',
                filter: 'contrast(1.05) brightness(1.05)',
              }}
            />
          </Inset>
          <Text as="p" size="2" style={{ maxWidth: 250 }}>
            In the industrial design field of human–computer interaction, a{' '}
            <Strong>user interface</Strong> is the space where interactions between humans and
            machines occur.
          </Text>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>{' '}
    elements and{' '}
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Link underline="hover" target="_blank" href="https://en.wikipedia.org/wiki/Typeface">
          typefaces
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Flex>
          <Inset side="left" pr="current">
            <img
              src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&h=540&q=80"
              alt="A graphical user interface"
              style={{
                display: 'block',
                objectFit: 'cover',
                height: 160,
                width: 160,
                backgroundColor: 'var(--gray-5)',
              }}
            />
          </Inset>
          <Text as="p" size="2" style={{ maxWidth: 250 }}>
            A <Strong>typeface</Strong> or <Strong>font family</Strong> is a design of letters,
            numbers and other symbols, to be used in printing or for electronic display. There are
            thousands of different typefaces in existence, with new ones being developed constantly.
          </Text>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>{' '}
    for the first{' '}
    <HoverCard.Root>
      <HoverCard.Trigger>
        <Link underline="hover" target="_blank" href="https://en.wikipedia.org/wiki/Typeface">
          Apple Macintosh
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Flex>
          <Inset side="left" pr="current">
            <img
              src="https://images.unsplash.com/photo-1553469945-2adfe230284d?q=80&h=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A graphical user interface"
              style={{
                display: 'block',
                objectFit: 'cover',
                objectPosition: '80%',
                height: 160,
                width: 160,
                backgroundColor: 'var(--gray-5)',
                filter: 'grayscale(100%)',
              }}
            />
          </Inset>
          <Text as="p" size="2" style={{ maxWidth: 250 }}>
            The <Strong>Apple Macintosh</Strong>—later rebranded as the{' '}
            <Strong>Macintosh 128K</Strong>—was the first successful mass-market all-in-one desktop
            personal computer with a graphical user interface, built-in screen, and mouse.
          </Text>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>{' '}
    personal computer from 1983 to 1986.
  </Blockquote>
);

const LayersRoot = (
  props: Extract<React.ComponentPropsWithoutRef<typeof ToggleGroup.Root>, { type: 'single' }>
) => <ToggleGroup.Root type="single" defaultValue="1" className={styles.LayersRoot} {...props} />;

const LayersItem = (props: React.ComponentPropsWithoutRef<typeof ToggleGroup.Item>) => (
  <Reset>
    <ToggleGroup.Item
      className={styles.LayersItem}
      onMouseDown={(event) => event.button === 0 && event.currentTarget.click()}
      onClick={(event) => {
        if (event.currentTarget.getAttribute('data-state') === 'on') {
          event.preventDefault();
        }
      }}
      {...props}
    />
  </Reset>
);

interface GetPreviewStylesParams {
  selector?: string;
  lightColors: ReturnType<typeof generateRadixColors>;
  darkColors: ReturnType<typeof generateRadixColors>;
}

export const getPreviewStyles = ({ selector, lightColors, darkColors }: GetPreviewStylesParams) => {
  const themeSelector = selector || '.radix-themes';

  return `
:root, .light, .light-theme {
  --color-background: ${lightColors.pageBackground} !important;
}
.dark, .dark-theme {
  --color-background: ${darkColors.pageBackground} !important;
}

${themeSelector}:not(.dark, .dark-theme), ${themeSelector}:is(.light, .light-theme) {
  ${lightColors.accentScale.map((value, index) => `--accent-${index + 1}: ${value};`).join('\n  ')}

  ${lightColors.accentScaleAlpha
    .map((value, index) => `--accent-a${index + 1}: ${value};`)
    .join('\n  ')}

  ${lightColors.grayScale.map((value, index) => `--gray-${index + 1}: ${value};`).join('\n  ')}

  ${lightColors.grayScaleAlpha
    .map((value, index) => `--gray-a${index + 1}: ${value};`)
    .join('\n  ')}

  --accent-contrast: ${lightColors.accentContrast};
  --accent-track: ${lightColors.accentScale[8]};
  --accent-indicator: ${lightColors.accentScale[8]};
  --accent-surface: ${lightColors.accentSurface};
  --gray-surface: ${lightColors.graySurface};
  --gray-track: ${lightColors.grayScale[8]};
  --gray-indicator: ${lightColors.grayScale[8]};
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    ${themeSelector}:not(.dark, .dark-theme),
    ${themeSelector}:is(.light, .light-theme) {
      ${lightColors.accentScaleWideGamut
        .map((value, index) => `--accent-${index + 1}: ${value};`)
        .join('\n      ')}

      ${lightColors.accentScaleAlphaWideGamut
        .map((value, index) => `--accent-a${index + 1}: ${value};`)
        .join('\n      ')}

      ${lightColors.grayScaleWideGamut
        .map((value, index) => `--gray-${index + 1}: ${value};`)
        .join('\n      ')}

      ${lightColors.grayScaleAlphaWideGamut
        .map((value, index) => `--gray-a${index + 1}: ${value};`)
        .join('\n      ')}

      --accent-surface: ${lightColors.accentSurfaceWideGamut};
    }
  }
}

:is(.dark, .dark-theme) ${themeSelector}:not(.light, .light-theme) {
  ${darkColors.accentScale.map((value, index) => `--accent-${index + 1}: ${value};`).join('\n  ')}

  ${darkColors.accentScaleAlpha
    .map((value, index) => `--accent-a${index + 1}: ${value};`)
    .join('\n  ')}

  ${darkColors.grayScale.map((value, index) => `--gray-${index + 1}: ${value};`).join('\n  ')}

  ${darkColors.grayScaleAlpha.map((value, index) => `--gray-a${index + 1}: ${value};`).join('\n  ')}

  --accent-contrast: ${darkColors.accentContrast};
  --accent-track: ${darkColors.accentScale[8]};
  --accent-indicator: ${darkColors.accentScale[8]};
  --accent-surface: ${darkColors.accentSurface};
  --gray-surface: ${darkColors.graySurface};
  --gray-track: ${darkColors.grayScale[8]};
  --gray-indicator: ${darkColors.grayScale[8]};
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :is(.dark, .dark-theme) ${themeSelector}:not(.light, .light-theme) {
      ${darkColors.accentScaleWideGamut
        .map((value, index) => `--accent-${index + 1}: ${value};`)
        .join('\n      ')}

      ${darkColors.accentScaleAlphaWideGamut
        .map((value, index) => `--accent-a${index + 1}: ${value};`)
        .join('\n      ')}

      ${darkColors.grayScaleWideGamut
        .map((value, index) => `--gray-${index + 1}: ${value};`)
        .join('\n      ')}

      ${darkColors.grayScaleAlphaWideGamut
        .map((value, index) => `--gray-a${index + 1}: ${value};`)
        .join('\n      ')}

      --accent-surface: ${darkColors.accentSurfaceWideGamut};
    }
  }
}
`;
};