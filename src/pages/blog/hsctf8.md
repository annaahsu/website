---
title: Writeups for HSCTF 8
publishDate: 2021-06-20
description: Writeups for LSBlue (misc), pallets-of-gold (misc), glass-windows (misc), audio-frequency-stego (misc).
permalink: /blog/hsctf8
setup: |
  import Layout from '@layouts/blogpost.astro'
  import { Image } from '@astrojs/image/components'
  import BlogImage from '@components/blogimage.astro'
  import pallets from '@assets/blog/hsctf8/pallets.png'
  import glass from '@assets/blog/hsctf8/glass.png'
  import spectrogramsetup from '@assets/blog/hsctf8/spectrogram-setup.png'
  import spectrogram from '@assets/blog/hsctf8/spectrogram.png'
---

From Jun. 14-18, I participated in HSCTF 8, my first CTF with [tjcsc](https://ctftime.org/team/53812). It's definitely been a while since I've done something that felt this high stakes, though, but it was a great experience nonetheless and I had a lot of fun with a side of massive pain. I'm not sure if I'm disappointed that I pretty much only solved misc forensics challenges (and random Geoguessr??), but without any further ado, let's dig in!

As a fair warning, my writeups tend to be more verbose so those with zero experience can understand.

# LSBlue

## Description

> Orca watching is an awesome pastime of mine!

## Solution

The title has "LSB" in it, so LSB steganography presumably will show up in our first forensics problem of the CTF! Thankfully, [zsteg](https://github.com/zed-0xff/zsteg) (which can detect LSB steganography in PNGs) does just the trick. Running `zsteg lsblue.png` in my terminal gives me the flag.

Forensics often requires command line tools, and many people online have posted lists of helpful programs to use! [Here](https://github.com/apsdehal/awesome-ctf/blob/master/README.md) is an example of one (that includes categories beyond forensics as well).

## Flag

```
flag{0rc45_4r3nt_6lu3_s1lly_4895131}
```

# pallets-of-gold

## Description

> It doesn't really look like gold to me...

## Solution

I didn't actually solve this until later into the CTF when there was only crypto left (ew) &mdash; one of my teammates did it when it first came out. However, I figured I might as well for fun :)) This challenge wasn't released at the start of the CTF, so I decided to skip trying `grep`, `strings`, and other basic techniques for PNGs. It also wasn't corrupted, since we were able to open it just fine via File Explorer. Stegsolve is practically my best friend for forensics, so I thought I'd take a shot at it.

Flipping through the various options using the JAR file is pretty fun, and I noticed a hint of text on `Red plane 4`, which became more obvious on `Red plane 3`. `Red plane 0` showed the clearest indication of a flag. It was also clear enough on `Green plane 1`, `Blue plane 0`, and sort of on `Gray bits`.

Based on the flag, I'm pretty sure this was not the intended solution, but hey, if it works, it works.

<BlogImage src={pallets} alt="Red plane 0 served my purpose!" />

## Flag

```
flag{plte_chunks_remind_me_of_gifs}
```

# glass-windows

## Description

> I found a cool glass texture.

## Solutions

As I'm sure is already clear, the descriptions to these challenges are not particularly helpful, although the titles are useful enough. This challenge reminded me of Fish from AngstromCTF 2021, so I followed the same solution method.

I'm sure some of my teammates are delighted with my use of stegsolve once more.

You can get the flag in a variety of flavors &mdash; from `Colour Inversion (Xor)` to `Full green`, there's one for everybody!

<BlogImage src={glass} alt="Colour Inversion (Xor) was pretty clean" />

## Flag

```
flag{this_is_why_i_use_premultiplied_alpha}
```

# audio-frequency-stego

## Description

> What a mundane song, it's just the same note repeated over and over. But could there perhaps be two different notes?

## Solution

The title made it pretty clear that it would be audio forensics, which I've been relatively successful with during my short CTF career, so I decided to take a stab at it. Upon playback, we hear an A played for the duration of the file, although we hear static on occasion, indicating there's something hidden inside of the audio (a defining trait of audio forensics, as some might say).

Typically, [Audacity](https://www.audacityteam.org/) is a good choice for dealing with audio forensics, but it crashed a couple hundred times during the first two days of the CTF, which I was not remotely pleased about. Thankfully, [Sonic Visualiser](https://www.sonicvisualiser.org/) is a great alternative, certainly after wanting to bash my head into the wall for a full day.

Instead of viewing it as a waveform (default in Sonic Visualiser; amplitude change over time), I opened a spectrogram pane (Pane > Add Spectrogram; frequency change over time), since the challenge title indicates that frequency is pretty important here. It's important to modify the appearance of the spectogram for higher contrast so if there are abnormalities they can be quickly recognized. Below was my setup for the spectrogram. You can play around with the values!

<BlogImage src={spectrogramsetup} alt="spectrogram setup" />

This resulted in a pretty clear spectrogram. Of course, a clear spectrogram is only helpful if you know what you're looking for.

<BlogImage src={spectrogram} alt="spectrogram" />

A lot of writeups I saw on the internet use spectrograms to find hidden pictures within audio files, but it's pretty clear that's not what we had. However, we do see stripes of two different colors: blue and green/black. During my earlier explorations, some of the different spectrogram values yielded visuals that looked like square waves. What do square waves mean? Binary!!

Coming to this conclusion took an ungodly amount of time, but I suppose that's a personal problem.

Now, an inquisitive individual may ask, which stripe is 0 and which stripe is 1? For something that isn't horribly long, you can try both. I started with green/black as 0, which turned out to be the correct guess. The strips are pretty thin, but it's pretty easy to tell how many of a color are in a row. If you're error prone like me, though, it might take a few tries.

```
011001100110110001100001011001110111101101110011011011000011000101100111011010000101111101110000001100010111010001100011011010000101111101100011011010000011010001101110011001110011001101111101
```

After obtaining the binary, convert it to ASCII, which I did via an [online converter](https://www.rapidtables.com/convert/number/ascii-hex-bin-dec-converter.html), and we have our flag!

Overall, this challenge just required some experience (and a tad of guessing if you didn't have any). I'd like to thank the TJ Microelectronics Research Lab for my past exposures to audio signals letting me recognize what this challenge was looking for!

## Flag

```
flag{sl1gh_p1tch_ch4ng3}
```
