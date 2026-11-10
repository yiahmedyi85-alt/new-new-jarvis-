# âš™ï¸ MARK LVI (56)
### The Ultimate Cross-Platform Personal AI Assistant â€” By FatihMakes

> ğŸ“º **[Watch the full setup video on YouTube](https://www.youtube.com/@FatihMakes)**

A real-time voice AI that can hear, see, speak, and control your computer â€” on any OS. Supports Windows, macOS, and Linux. Built on the Gemini Live API for native audio streaming, delivering zero subscriptions and total digital autonomy.

---

## âœ¨ Overview

Mark LV gave the assistant a screen. **Mark LVI lets you choose what runs it.**

Until now this was a Gemini assistant, and only that. If you had no quota left, no
connection, or a rule that says your microphone does not leave the building, you
had no assistant. Mark LVI adds a second way to hold the conversation â€” speech
recognition, a language model and a voice, assembled from parts you pick in
âš™ â†’ **ENGINE & PROVIDERS** â€” and a way to point the assistant's own background
requests at a different model without touching the voice at all.

The local model can be on your machine (Ollama, LM Studio, llama.cpp, vLLM) or
somebody else's API (OpenAI, Groq, DeepSeek, Mistral, xAI, OpenRouter, Together).
Both are the same setting, because all of them speak the same protocol.

**None of it costs anything if you do not use it.** On a default install the
`providers/` folder is never imported â€” not at startup, not on a tool call, not
when the settings drawer opens. Measured: the decision takes **0.16 ms** and
loads nothing. The folder can be deleted, and deleting it changes nothing.

Everything the assistant already does carries over untouched. A local engine
inherits the avatar, the lip-sync, the self-echo guard, push-to-talk, the wake
word, memory, undo, the confirmation gate and every action and plugin â€” because
it enters through the same door the Live session always did.

Mark LVI also changes what the assistant is allowed to CLAIM. Every tool that
drives an application now answers with what it observed rather than with what it
attempted: `done` means it was checked, `unverified` means the request went out
and could not be confirmed â€” and the assistant says exactly that instead of
rounding it off to "done". Opening an app watches the process table for it.
Closing one asks the application politely, then checks whether it went.

It's not just an assistant â€” it's an extension of your digital life.

---

## ğŸš€ Capabilities

### Core Features
| Feature | Description |
|---|---|
| ğŸ§‘â€ğŸ¤ Holographic Avatar | An animated human head in the HUD â€” real facial geometry, lit and drawn in software, no GPU or extra packages |
| ğŸ‘„ Real Lip-Sync | ~50 mouth shapes a second from the audio's formants **and** the transcript â€” closures, spreads and rounds, not a volume meter |
| ğŸŒ Language-Free Mouth | Articulation is derived by Unicode reduction, so Latin, Cyrillic and Greek scripts all work from one rule set â€” and scripts that hide pronunciation fall back cleanly |
| ğŸ™‚ Facial Acting | Brows track the phrase, gaze saccades between fixations, natural blinking, a small nod on stressed syllables |
| ğŸ˜ Face as Status | Looks away while thinking, meets your eyes while listening, lids fall while asleep, glances down at new content |
| ğŸ§š Push-to-Talk | Hold **Ctrl+Space** and the mic opens â€” closed the rest of the time. Truly global on Windows, window-scoped elsewhere |
| ğŸ”‡ Self-Echo Guard | Never answers its own last sentence: the tail of its own voice is recognised and dropped without muting you |
| ğŸªª Runtime Self-Knowledge | Name, OS, abilities **and limits** are generated from the live system each session â€” rename it or add a plugin and it knows |
| ğŸ™ï¸ Wake Word | Local **"Hey Jarvis"** detection â€” sleeps until called, auto-sleeps after 2 min of silence, and never streams audio while asleep |
| âš¡ Instant Acknowledgment | Speaks a short, context-aware reply in **your language** the instant a longer task starts â€” no more silent waiting |
| ğŸš€ Faster Live Engine | Runs on **Gemini 3.1 Flash Live** â€” roughly 2Ã— faster time-to-first-word than the previous model |
| ğŸ§© Self-Describing Skills | Every bundled skill declares its own `TOOL` dict + handler and is auto-discovered at launch â€” adding one is a single file |
| ğŸ§  Recallable Memory | No size limit and nothing silently forgotten â€” the prompt carries what fits, the rest is looked up on demand from a local search |
| ğŸ‘ï¸ Memory Panel | See every fact JARVIS has stored about you, when it learned it, and delete any of it in one click |
| â†©ï¸ Undo | Take back what the assistant did â€” files it moved, renamed, created or wrote, and settings it changed |
| âš ï¸ Real Confirmation | Shutdown, restart and WiFi wait for a button **you** press â€” the model cannot confirm its own irreversible actions |
| ğŸ§ Audio Device Picker | Choose the microphone and speakers by name, filtered to the short list your OS shows â€” and measured, so every entry actually works |
| ğŸ”— Session Continuity | A dropped connection, a voice change or a device change no longer wipes the conversation |
| ğŸ§© Plugin System | Drop a single `.py` file into `plugins/` â€” JARVIS learns a new skill on next launch |
| ğŸ“º Video on the HUD | Plays YouTube, a local file or any video URL **where the avatar sits** â€” starts muted, sound on request |
| ğŸªœ Model Ladder | Nine Gemini models in one measured order â€” a quota, a timeout or an outage steps to the next rung instead of failing |
| ğŸ”Œ Choose Your Engine | Gemini Live, or your own STT + LLM + TTS â€” picked in the UI, no file editing |
| ğŸ  Local & Third-Party Models | Ollama Â· LM Studio Â· llama.cpp Â· vLLM Â· OpenAI Â· Groq Â· DeepSeek Â· Mistral Â· xAI Â· OpenRouter â€” one setting, because they share a protocol |
| ğŸ—£ï¸ Local Speech | Whisper on your CPU for hearing, Piper for speaking â€” **~50 languages**, neural, entirely offline |
| ğŸŒ The Voice Follows You | Whisper hears which language you spoke; the answer comes back in that language's voice, switching mid-conversation |
| ğŸ¤« Reasoning Stays Private | `` before answering, and several servers pass that through as ordinary content. Without a filter the assistant reads its own reasoning aloud: half a minute of *"the user is greeting you, you should acknowledge warmly..."* spoken in full, before the greeting. It also lands in the log, the session summary and the conversation history, where it costs context on every later turn.

It is filtered on the stream rather than with a pattern, because a tag is regularly split across two chunks â€” `"<thi"` then `"nk>"`. Tested against two hundred random chunk boundaries.

#### ğŸ›‘ "open whatsapp" opened WhatsApp four times

Gemini Live ends a turn itself. A chat API does not: every tool result is a fresh request, and if the model answers it with the same tool call again, the loop has no floor. The tool worked, returned *"Opened WhatsApp"*, and a small model asked for it again rather than replying â€” launching the application on top of the copy already running.

Two limits, because they catch different faults. A **repeated** call means the model did not understand the result it got, and re-running the tool is actively harmful â€” so it is answered from what the tool already returned and never reaches the application twice. A long chain of **different** calls is a model wandering: not harmful, not converging either, so it is capped and the model is told to answer with what it has.

### What it costs when you do not use it

| | |
|---|---|
| `providers` imported at startup | **never** |
| Deciding which engine to use | **0.16 ms** |
| Extra work on a Gemini tool call | one `stat()`, ~39 Âµs |
| Settings drawer open time | unchanged â€” the panel loads on the click |
| Tool declarations sent to Gemini | **byte-for-byte identical** â€” 56,148 characters, verified against the previous release side by side |

The first version of the settings read the config file on every call â€” measured at **143 Âµs**, paid by every request in the app whether a provider existed or not. It is cached against the file's modification time now, which also means the panel's changes take effect with no restart, and nothing has to tell the module that a setting moved.

### The things that were measured and were not what they looked like

#### â± The first thing you ever say took 8.9 seconds
Loading the speech model is 1.4s. The **first transcription after that is 8.5s**, and every one after it is 1.1s â€” it is the recogniser bringing up its kernels, not the load. That was paid by whatever the user said first, which is the worst possible moment: a person who waits eight seconds concludes it is broken and says it again, and now two turns overlap.

The warm-up now runs a throwaway recognition on a tenth of a second of silence before anyone speaks. **8.92s â†’ 1.16s**, and the warm-up itself costs 1.08s of a moment nobody is waiting for.

#### ğŸ”‡ A system voice given a script it does not have returns success and silence
Measured on an ordinary Windows 10 install: two voices, both English. A Turkish sentence came out as English phonetics â€” poor, but audible. A **Russian sentence produced zero bytes, with a success code.** Silence that reports success is the worst failure there is: the assistant looks like it ignored you, and the suspicion falls on its speakers. It is now an error that names the cause and says what to do about it.

#### ğŸˆš A whole Japanese paragraph was synthesised as one block
The sentence splitter required whitespace after the full stop. Japanese and Chinese do not put one after `ã€‚`, so nothing ever split. Two rules now: after `.!?` a space is required, or every version number becomes two sentences; after `ã€‚ï¼ï¼ŸØŸÛ”à¥¤` it is not.

#### ğŸ§® A default that only reaches new installs is not a default
The tool budget below was added as a preset value, applied when a service is **picked** in the panel. Anybody who had already set up Ollama never received it â€” measured on such an install, 20 tools and 18,039 characters on every turn instead of 14 and 11,871. Most of a fourteen-second wait for the first word.

It is a property of the endpoint now: a model on your own hardware â€” loopback or
a private address, because "your own model" often means the desktop in the next
room â€” gets the budget unless you set one yourself. A hosted endpoint never
does.

#### ğŸ§® Halving the tool count did not halve the payload
This install declares **45 tools and 56,148 characters** on every connection. Gemini carries that. A local 8B model does not â€” it picks the wrong tool, or emits JSON that will not parse.

The obvious fix is a limit on how many tools it is given. Measured, that is only half a fix: 20 tools down to 8 â€” sixty percent fewer â€” took the payload from 18,039 characters to 9,050, because the tools worth keeping are the fat ones (`file_processor` alone is 3,024 characters). There are two budgets now, one for count and one for size, and whichever bites first wins. **Gemini gets no budget and therefore every tool, in the original order.**

#### ğŸ”Œ `localhost` is not `127.0.0.1` on Windows
Windows resolves `localhost` to `::1` first; Ollama and llama.cpp bind to the IPv4 loopback only. macOS and most Linux distributions order it the other way â€” which is exactly why this ships broken, because it works on the author's machine. Every local address is normalised to `127.0.0.1`.

And a proxy set for the whole machine is **not** used to reach that same machine: `HTTP_PROXY` is commonly set globally on managed Windows and macOS, `httpx` honours it by default, and the result is a timeout that reads as "Ollama is not running" â€” sending people to reinstall a server that was working the whole time.

### The shape

#### ğŸšª The new engine speaks the old engine's language
`main.py` touches its session through exactly four methods and reads five fields off the events. That is the entire contract, so a local pipeline that implements those four is invisible to everything upstream â€” the avatar, the mouth, the echo guard, the tool dispatcher, memory, undo and every action and plugin work unchanged, with nothing added to any of them.

The alternative was inventing a neutral interface and translating each side onto it, which means rewriting eight thousand lines of code that already work so a folder you might delete can feel symmetrical. The new thing adapts to the old thing, because the old thing is the one the users have.

> **The deadlock this avoided:** `main.py` answers a tool call from *inside* its loop over `receive()`. An engine that waited there for the generation it triggers would be waiting for events only that loop can consume â€” the turn would stop dead on the first tool call and look exactly like a hung model. Every send method records, schedules, and returns.

#### ğŸ‘ï¸ An engine that cannot see is not given eyes
Each engine declares what it can do, and that declaration feeds two things that already existed: the tool list, and `_describe_limits`. A text-only model is never offered `screen_process` â€” and is *told* it cannot see, so it says so instead of describing a screen it never received. No special case anywhere; runtime self-knowledge was built for exactly this shape of problem.

#### ğŸ›‘ Something has to decide when you stopped talking
Gemini Live decides that on the server. Nothing does locally, so with **push-to-talk** the key release is the signal, and without it the engine finds it in the audio: the noise floor is measured continuously â€” fast downward, slow upward â€” speech is what stands 3.5Ã— above it, and 700 ms of quiet ends the turn. Energy, not a model: a neural detector would be better, but it would also be a second download, a second warm-up and a second thing that behaves differently on each platform.

### âš–ï¸ What local mode is, and what it is not

It is **not faster.** Gemini Live answers in roughly 0.3â€“0.6s because it has no separate recognition step, no separate synthesis step and no round trip to find the end of a turn. A local pipeline has all three, in series â€” 1.5â€“4s on ordinary hardware â€” and a turn that calls a tool costs **two** model round trips instead of one, because a stateless chat API has to be asked again with the result.

It also gives up barge-in, server-side turn detection, proactive audio and session resumption.

It keeps tools, memory, the avatar, lip-sync, undo and the confirmation gate. And it keeps working when the quota is gone, the connection is down, or the microphone is not allowed to leave the building. That is the trade, stated plainly so nobody chooses it expecting the other thing.

### ğŸ¤ It stopped saying it had done things it had not done

`open_app` answered **"Opened Spotify."** whenever its launcher returned â€” and on Windows that launcher returned the instant a *shell* started, not when an application did. A misspelling, an app that was never installed, an installer that moved: every one produced a confident success, said out loud, while nothing appeared on screen. That is worse than an error, because an error is something a user can act on and a false success sends them looking for the window.

Every tool that drives the computer now answers in one of five words, and the model is told what each may and may not be spoken as:

| | |
|---|---|
| `done` | it happened, and it was **checked** â€” never assumed from a return code |
| `unverified` | the request went out and the result could not be confirmed. Not a failure, and never to be spoken as a success |
| `failed` | it did not happen, and here is why |
| `ask` | nothing was done, because doing it would have been a guess |
| `started` | it is under way; the outcome follows separately |

The evidence is real work, not a longer sentence. Opening an application watches the process table for a new process answering to the name. Setting the volume reads it back. Setting the wallpaper reads it back. Sending on WhatsApp goes through the driver that proves the conversation is the right person's. Where nothing can be read back â€” a keystroke typed blind into Telegram â€” it says `unverified`, and the assistant tells you it cannot confirm, which is true.

> The shape came from `whatsapp_call.py` and `whatsapp_guard.py`, which reached it by hand after a real message was reporte3Æ#üş|öI‚»(5fLi)³´A‘£Ò¿eÅ^•€Tg¢×åö¿*·‚å^ =ú*˜ŠÌîX¤û;¶c×E…!D¥ESwp©?\»×êRÔ×dàv"oÂê©úIU‡Hg«X4ç*ò³D Ô:FÄ˜m	¶¤‰kÁ÷µv
1,óèóàA…_ú`i_µ»ë~%—åóáLÓ3e >Ëªâør'8:&Ò/ú^{3î©¯déÕ'êjt.PXÛG-{ùnmWõ`¤k2*n!q25NÉ#0_T#xÜ_>£…Ü]µ½¢û|øµ¼Ô*J¡^¨Á¦}J@ò=m6 ä|Fi¼XK¦ê4²ÊŞ^õ2«/‚š<¶µkB—[o®K~öe|QtJ6…g¤ÚÛæ+ãsSÍh½õÏ¨FÏıOJhfDqM¡ñSBÅ„æ§òÀBŒ"ŞD%ËwW{˜§kï•úzı@:%÷r@ÕáH©Ö|èÉi+Ø÷ËçÍ2ş:0×twÙ»ğº_u€RU»>¤+àbøÅ4LV`Ä^F†ùQ¼“¶WIS†\N;Â{öpà Ew¨^ÕWÄ}K<Şêb’@¤«}Çç	òz‚*²FˆJÀâ4RtKò¡&­OİBéF!ùï€ú¤»[!ö7İ¬òsŞş )² (òWø7ù:×TƒÆ²N¼0İ³X´îú}o:9í{ŠSÆ½/á1¼–GÆU/É4Rš0uÿÈ›Qw"lc4ívÎÆ¡'~â›6ùñ¹YÏBxpl zâ4\I:íFsÛ‚+@-8>n&Dınwœ"ä6.'kaÌ”(%½lãäÒ•åZn=8Rm 0?o­±  59uC7kûq8GGTëø3ã5$ç:fq<äöhpÄÀ_@#HB&É‰¨AT:vh`VİKOCC,LZf™ÒÆË m1‚RÕ2„ ]	~vAfzhì²-R&28NIä"RZaÆB©Oc`ó.½)8{iäñvâTc¼b³K`Í~@~;Z-#Úez«NuhÅ8;5A,48ÕJuXyu¿K“J>s;²ULS^@+"×ß?i+Ve5dL® y©OÆå¸E»$ÎM|1l;Ö‹5ÌEM.\ÅxATò«°)œ)CP‡“_ÔN
S¼ÖhÎ·˜I fyê%Æyê`r-ÌúÇzUHdv;9xÅ³ù|Y§b\"!bÿT/8*/"¤5~B$spq$Q“ÏvMXœ]Yx:£¥BÁlº4)R7Ã4äÌ*J¶Öa*éqH7É3F•L1bPXPÕ]6y\ZÆ
3J®~×Á]òa_µ%vas9}vXt
{Æ<;0=•ën`0®lê=¯a^WFWxeº.ÿ)_w8ÏI°æëÛîc8Tq½†„a"•½ÑÔ`2$'é(æ:+ìV¶ˆ6w?"Ny|g±’|3æP£"V|rsNF;!—„qrE]ìhM-P¾çe.QA!)¢#¨¿b{ü‡àıá`fp²FSr5aÇhZtü!p"o?d1zJäŞH|¾3Ñmƒ<8rpOm±¬  å~zê2´u'#£¦°;‚êv}"y@? pM^C&Xñ”-#oP·4ô~]Ä©¬·dÎìLd
{$!¹µ¶Q’e7ö?¸ô3m)(—Aq°E"wgfB/!\ğ#¡H  dRB&Z`%8$B¢a&cc++*ä}i¬j'’_uBz …‚ñ`modme4MÖ š&ëÒJwm~rŸtjq, oïlánÌœR8Ü*Æ._e:~ˆÇ„~Ç/|E{rZaÚ;_²g|S÷<$p­ Ûxs}m€İZ^!fkfı#š¨+uDzc|xÀzÏr-'J&ì"~c%s!IqHàWzng-uìfy34¼³5&J_ç&#xRd´Ge;ğ"ğø`r·Ô§1klgo'fuî%i÷8»cmdGÃ60iŸMrtëy)›´n&¬’'*<–óeÛb×{wàoHEm7İ©hŸÎwEÿ0nş/bäL1()ŸDBQ5¥yÿhtXY€[( n\)q¼£op.5"gM˜üi0.=mh2e´2h¼2lw`EªQêx5úyu6>2i'~>)O5®{e-7{VOû'2{²|k²q\HkŸô@G¹	6{âZöz‡l O-7l}ñ#a4³±,êG~`v§P3|c S9k61®y3"/D/z?¨6Z\ÒBtqn?È )É;ÖM}•#llVïm°°Iíl0|j%vqRôßQùbÀ³ÔóMuh}i''8©)|v:ïoåtoWsO¤l|,xjàM}–ƒ,41-1 MºHsB'}j}.>í1#u#o†2bÓE	H8ÏP“&&ws&LQC!QSÍä:5œÊè5ãsk˜’3WÈ"ìMg=>'yâö.·gM¨xYn_a'|?f¼s3{!KœæE%[
{TsFÊt'>4g2#9íq&rV+)¢s kWÈev]%>0Äû¦ãJFş–Yw7®›éf}$$e¯2Æ‹^O¤å¤&*VÃd!Òo[|va}Bğ4Yf!4#$¬]&3>ùfHo""(jqLUA$+Y²!fµ-xt~$^6pªqè%G—.tLnŞf«31â)$D8$À-+NJb,ïXH>‚>p=]ğ7ß-šPÔP~ñdj”1b-+#sñ9U~ˆİ
]s *^ï#*¯<gS.&!#c²SòY*4ùª¶i?n¼÷ò¯9g/hQqr9Im¸lHä‰#‚=p-J¹&Fæ("ç.Lv£i¤-pä!	7b­{h„5i‹:iA3$ûjÃ;ÊP>¨ËU4P{®522syÜ G,Yz6&töã„úåE[*mhHÕ<‰¾5=z$/n6j:¯g÷)c
üL;y6n‰¢ã'}[?5xJ;bSX—Ftb~F& {7,fmË[L5n1W§«œd#Omz?>ÄbèU
Ö1ÅÆQÙ#¼C–?6I/5z[³Çäşdhúb?óxM%mhóü\¨xU)h =r¹É4ÄL{ó#3W"
B<3d*§:·ìxh$bÂkìs|é6fGÆîHo$hÊöa±/o‰xw¡@[ƒæO¯8 &6(S3|±4´fÃ±jvy­gpujbiåo1ªø_Æ%>,8LŞ‰¶x\Zà?@ë:¾vq—<êr%h½Mk)7Pä!ßNi´ª4È~`{r¡¨g2Wádm•!vZHW2r$±täÖ[:K* aè	¸17OT-„r#ö
3avzõ--8Q$Û@O ñã7%³6J æAs"c99c`aDV).GSTmÄ$. 6Y³4›=:Y	A/,r³î°9z;giÂ*a|d$~$¾š¼2ÓIQ_ é4ágÙf†(2Ç:Cy7ypaT9ô9t§aZ\o~³DûNÃ [N¯_>uo+iŠ‰i¸+c!%p'µX&ks´î`
˜>Ü'yd9"}1T2$?7d†9~O3t!}{8o‰—$#ä5Â[?^ô=¥Ow¼z ïw¤—7rtu¾h¶†¯KJ,}„Dx"9éÛë XIE‚Moá"Ÿ)<dF»¡ZR‘
uÓah&x1l|g 42õ!.n§m-f+lv‡Ñ!¶.1ë@Ã&1uêt{3e~1Lbb1b~ákù(î/&¾¤lho8(¡%ØÑàtİ,%ar@6/cÕ$J)«êN!ÏY#:EÕ:õÓ$493AùVñq`ku\+AÁvj
áJø`5À½£3b|›yUgTqBêdö)ƒt3e;0#z[e4swo0sŠÎ!'×Ú±…/<1"9Ği(xqJOfàey5øi%`$®”â“;8Ù®n"¤ ôn|æGc8Qa¢9~¡otê@_:3fK0¶B!‘,2j»d"y•v]ägy¦tftQft­I ¸;3Äû(iØ'0b§ pV{-lq*OPĞ~ˆt{L¹9de«ãq}L*$Íñb5{My&¨¦m9àwu/ig*Ò5>Å(cwc¨ôÍ	Ù iO{:p?D¼)f¦^´o?Ÿ9XÜ3%Kÿ¼zşg«‘×f¢àl"q55!ì:d0Ò	·^E¹z5Ğ˜,?"p::0,>.*0Q|u·P^^©fìÅdápö`íÒc:a;®q,8·{Xp[õ¼%§B|e*zUMX&5.QsÎŠÊT[et1Kbà)hvKÙE°Ä…!9¦vQf2W~%hÑòvp Qqr?dÿ»ieOì:$9mŞ F<İQ^¢m5©$&Íí59yª9îe}iûÇhp` ›#Có¯P¶@ByYàmf hiäVàw"hŞ½e(8©*)Áœq·W,ò«RéÖ9¶9Gøµ;…Éİ2r/k8”éÊD+9Jy+î6r-Rj3t?yyÈ"e0aboZ#7e'‹¹|~Õ~lZÍ:Ù„rÔ¾åGö \~=Ksyaacg4&"H=b b~d;AÍy?~C
{1DütTm?b"bõ7´ôÛQÌ<Á§Ga6"´ö ô¹o¹VäZ`À`ZÌA€ú<÷ ¨[?ìşöj@æújğ¾nF`H|ğK­¸cetT,%qí³!³/7²$_,éz	h"¸­92buÒ"i~?ó$Òu6<l{5Èf||¦rmI+P{=f…ı›ç}]áŞrğ®5½3`§
 ƒP85t,o·(D¹1],–h	l:bBÖ;±jóŠ}HJ/oh¹ê×IM“03g¯n){HGavÚ»as¡²§Zs@;	4	6PI&ÿy…1¿’'i$>`+ì¶g];0‹K­R#N<wÿTås~¬}·ª(bmx?gcøût0H…í=ì6B¯G}¯WZ½öTİN0kÜø}K<4ñX/³Qñ9Z¡~]~Ji
Ë2¦HP½:t`rÚÛ4c*™Œ-8,C6¬%/fQ3¯nbõNğmj
Xzj9ìf:$HGèq
M.|„Â]ëIjrœ LF&è§$*QõQaãƒ¹ó/!M2÷D9ïB >t"¾âıbß?L3å$?k"'p‚'j¶úi&)ì;OÀ}-G¨#ƒs
c:Z"©dmH	­áRa&.j.šÈlX11ãYb ÿçÃ(.CXxĞ©U&\q0©.[òè@k®<F,è{·AàŸöœ]º#–µ‰Xï!áêÇ6„5¬pSGpÙş—¦j²'öÂoØ´¹\»”7HT3Zkè3o ]ÓèX¼Hl%ş(Ótƒ<ı(gUÓ*ò#Lñï)ÚH¬õ!÷Ğ €»é5m<ìü$ÚÈ^ó¦VÀ‚:b2‚ş¥=©x<?WÈpÅ–M÷RÑÄ
ô#&r€&í1—²9b6ùFvKlİ$Á8g›Ş¯5bÂ¬t¡ôAº›ÆšoG¯Q†˜w¸ƒ«z´Ìÿ^ß&áŒo*ÈıúèN:ÎEC0µäHD™Aãij%&v^#Æ²×€Ÿuá
¹zØˆzwÉĞE•¢ è[BË~îöë	ë&$ !ß+çÀXÈ¶ºcú1`ÿ¡mü¿­ê#œ#”3Úäæá!Îµ‡’°pöC¥x ¼a–§7l âú©hd-ævĞğ‹Ç£@q2 Ü’2$‰8[É¿;îÆÉ·Èå¬ö×òo°Y„'0«zâ‰ƒÂº–çTu(32‰±æ+K¬-kŠln=Ä€x¯úèÁcTá–Í‹ë´m*‡²“ˆG´xd“°&/ÒZmrö;t/^ÊŸjnµï:'IaLR=>e!: pkMbl2ğgR!¡e^';IbÄ4D‡U*äX¤³`ë1(ƒ—eÁp‹~emau¾1sÊu>d,âoâe1g/ç`o¶3%È=+{n@bÚ€FódweGÒ7^Ñ!V³ZÂ´5W¼Dr¾LjbêÌ«Y´C‹Âè ò„÷B	=°½\§®Qr<qèCK®Eª Á‘>ëkdÖHv/Kw%³SïÖ!54xb ·À5y.fOew?îágDtÂ½x\¯qz\W@A5¥û%êu_4ƒJ|ú'wOK¿%…oÙ­¯}b{éä(#o¸!#á%j~glô¼­0]`t1yÂşh?C%n}zF mºKªzi÷ƒ­³-<;dKx4¥WY˜¥,8TëS|? bq8ìÆ
#XİNtTï®¨dY%"/ô±1 ¹rzœ=,em5#(q÷²AEÕ>o<-lV+m%ãn_'÷Ú(5!W;72*'c]3>dºçõ{íbm}@”¦{¯-&	byL6,PS²º=*?,»6v;üg‡£UdÅ‹&·i¹q2FûfÈSªğı8;@â-ROüŒuê0ûyUKx(y*ó™£„r*L±rk­-AI..Gn+,½ÙÚˆ¼fdr+FÖK¢dvRÇÙcĞeZJqzäÃ=->MiáowÑåk=avxwL!.se(E*jR</|du®g¯	[ÆYüÁĞIeJx8ÛN!jGfxëúc¶%àµµ`q=}Öd*’y›ÔlD@4ë<ö4hef/ )8dl~mc.hS-b*à†l1b5%¿ÅAY<| !Œ%Mbxóâ±°ñ³=qgKmd4u\åtÄS
0Ì>àp²ºÀ3#V&>`~Wà}ÁìÙ‚##;È¹Ú4ª}>d-FKF$3>i-z¼¥‡¥m#*:ô
jq}&j°4ñ11tG$­CßçH	ß? #4 +Zm
g,ö7‡nVas~	578W-;)jpyt%7r8")²X”v!Mi@**¡{º#q7ó¶¿Llz2dA%VT†g–'ƒtÕ*	_2!"%ËbßâÁ¹>sënv!ht·êy¥D;ïU9?³ßíz™<jÊ†.NOwzŸéyDvu­O…@n="=tGgfs@{I%@´—.%h›Ë½ïˆa:*³Å³#uj$Ğùş-=#x >;'¬&(3ô!A):ë|blßÑ-Lı¼÷Ph;fºttÌòxÓD#xk'7¦€Ol…nlkğçikR|Rx rOrqOeLØí,yp´¤Ä3*SiQi5Gù9Ô«>$Ä½>z"9Zô-ÇöqyàgïbKz­Š'"‹H5Y%hUA_gğî=yYf–ü\/îL~9!G5fã[y1RIÏ½dQkw6&‰ yxOy@Cª6',>ÇJ£j«@+î#gÑ.%©SzM>;/c"‚ ¦mFLğh8(/d,oa¤h[EX‹°L-hCâ*Şe4YÍ‹v§||unMfûÅq<s7máƒ:ä4a9©f“.l&àb?» .Ò6möl­(e>¸×7 z×À²«jÇec	Ù·‡d-³±ÖÚy.*X34'9m"oc Dœ²+XãH?~baç(aPKWV# •c{p¯cH3+6Gl#@…
|_{ FúcƒgÓ˜?2m94yg&´R9l:Ÿ=i%ã§ˆ8Î5i%&Ş(òne4`v5ö8¬	i§"aşpz½870gi:‰@ø~m¯Éx/4Ê[Y¹”é-<.ğ`1r5'"f‹Xä88Ø:z3(Ô&41	ğŠ_óyiy±:î‚/a&Y'huí:|,É9o?dôgQZRM­ÇSS	:oiÒr g&X:z8bÊ"lØ\dÔp‹eKphŒ´xtb­˜l8"`ó&jh€,èÁwelo`bÇ¶¢d/rpPØ½pÆ+OÄ=Á{ ø*g*!~ıŞ%#‰À
Kxh}¹ƒ.3óG—\Á
¯e8í«y7&:´AùgJ˜Yë¢hH'Ê/İ)Ë”g/Ê¯ÖF5¸6ï LHáuO?á§H`Gu 
t)Hì¹/"8 g¨îÒ‚ïO›$Yµ»C~-y´*$oæ(z¾€3K~=°½õémG2]/h?.šm0»:yÿmsÚg?G~¡Òj>¥Ş¢,4aN
Ù;N,@QZ,…à"ğïìQ±°î8M>.ONs×EB~ã¯{®­3WbüÁEi†&&¶ÔD1dD	½‹]Ê%6Y£ã¥Ğ&®2t4Ÿ|©ÙE1>in"=­ÿÉilNIî§1h£|kg æW03P	,Â±ÿ&6f5d0?(L³7`Š":s Sr¥e€BÔºtºzËw,d?4*öä q1áægp¸İ764~3y Ê<{?Qv;j ü,3Ü/t 5ı}±<&[j›O ¾„hb3WÙeNªXduÓqlGMèDS!Rj/!sª
ÙÈÜìI‰¸T¨YŒT$Ë6+×óÕ—BDÒVåŞm³¬Mv5Ş{£· š¦Ø°Ó¨&2tI\k(Õt§ªqÁ×äÕõË×3+©Ê.A5^ÄÑzbx4<æºØJƒ¯ê·\òWÜ »	@¸Ó¨v4®ÙG×ú:‡©W³ÔRnÃ_åsuä)ô
.í#ĞÉ]¾Çc÷€ğ»'%ãªâé°¥ÄÖ€¬«vm“¯dÕG…Ùiêög Àª®®
V³ëK<ÃÚ¯ğôQnÖS+­Qt‚ì¤¬İ`|>˜á…ÙòÊ÷­Uö-p«‡p‘ZáïÂD‰Å&7ì /i&âNFÊ‚#ªç>Æo‡¨”kùykÜ|¼ÉÏÏ°ƒP.ª¥õcÀbƒÓê–_X…™ëÙ1yO‰.nÔWÕ~;"istÿÍx˜©ÔMkşÑŸ9A¸Ï'ÄŒº[`ŞA'kyÙ1[mA5[h³¥öivÅDìø‘x§)(è ­ñNzWùõH×2¥³¬1GşÀf&rWöÀud¬U½3Î€µAÂTÇ–l=ú¸™÷<W ®¶¦.1—”ÉäÄ½%RÔÎawòO­°:
tc[K*MU*á÷üÍÿLğ ­²àÑ5vÔÃêoØ	¬?Ô;	êÜ—Ò¥ÏA9êe1}=G´¨\´±óOÏü°N)–Ïôş'ÍSëOûÿ}í_Ñ £-iKÉñsí[ÖÈQgW|';šX hbe¢9Oì×D­}^/S–5îä…Gˆ¨ '¹vkÌQ¦HñˆE.lj\E¦RlÔ“LˆÜØ‚ÿ:9'yLO“?f#Ğ2'ØD¹Z!%#Åòm.xaxÀ:*9'ñöojGqóhº»Úd3öxxç“,6Ø`c™Âì`¶`=#kr¤wU <QB¿;VArt]Mq1 ôR¤l!gø±şÏôsyœ.‰/Låà›"VÒ{ô…\F¯KÍÜC c€å+X¥!ğ†2|ôğµ:©ä¬ÃyêhÇŠ–k2Ug')DMgş|a88çûœ*wl[¤exn45f$$Ji)[¨5UüµW	ï öeB")¢w±°ñ^&Ù`ğÈ	ø:.8`eX>S:Ba4ÁiC«øÛY¿liÿptJjõh<óf©y[±cpO.,¸UP•¾Zu6,h.Z7%ÏOëafBXïµe	¸ã[·ÀS„ós'¸ÑùÏ8y:T­4ú)`éIJÍ]3/7u,%l|p_¨3Xt6X+Ò
1,ªN:=u
¢˜¾hRvĞœ—b|ß[{Qp"E­vk·ğq25°Z[àC;~H;*p,eqÖNï(45ââq²£èiøó=lp [bš|‘—¹Ñç‰¸Ï½d–«ƒÏàxÒµ(ê(¿zıTºÇ ıBW,Ôfa·‚?ºÖƒk²éÕµ˜ª—U7¾­÷è¡Ì9`èN[L˜nR)zvB¦ŠhK¬egÖ¶‡;ífé“§VDc™ á¼O;OTà‚éšVµÒ¶‘„-vg¿sS>(.7Û¦:ú>1±ù6tşHıf)ö“©×†~Æ|‹ç@¬«{gZz½ä,ê­f€
œF õ#4a8v1=AÙ!êxoïµ7ª5	?b^2à6#{©8@/úUi2×€1m	è!µê»;rfBğp˜j´:ÉQ;Ó­BÑs*lz¨Œá©'å¢àö]¤Æ t=o<6L 1ö,s"~ä'0_) 2¹ µ¢/4arch
  measured in seconds on a GPU once one encrypted command had been captured;
  it is now about a hundred thousand times more expensive per guess, for 80 ms
  paid once at pairing time.
* `/login` is **rate limited** â€” six wrong keys and the address waits five
  minutes. There was no limit at all before.
* **Tokens expire.** One issued once used to work until the process ended.
* **"Revoke all devices" now ends the live sessions** it always claimed to. It
  cleared the remembered devices and left every session those devices had
  already opened working, which is the one case anybody presses it for.
* When HTTPS *is* switched on, commands are **AES-256-GCM**, not AES-CBC. CBC
  concealed a message and did nothing to stop one being changed; an attacker on
  the same network could flip bits and the assistant would act on whatever fell
  out. Over plain HTTP there is no `crypto.subtle` and so no encryption at all â€”
  the page says `NO ENC` on its own badge rather than pretending otherwise.

**And Windows was blocking it, per executable, invisibly.** This produced the
strangest report of the release: the dashboard worked when JARVIS was started
from an editor and did not work when started from its own desktop shortcut â€”
same machine, same network, same code.

The shortcut targets `pythonw.exe`, so no console window appears. An editor runs
`python.exe`. Windows Firewall rules are **per executable**, so allowing one says
nothing about the other. Worse, dismissing the "Allow access?" prompt â€” easy to
do when it appears unannounced â€” makes Windows write a **block** rule, and a
block overrides every allow rule there is, including the port rule this app
creates for itself. Measured on the machine where it went wrong: `pythonw.exe`
was blocked on the Private profile, `python.exe` only on Public, and the network
was Private. That is the entire difference between the two launch methods.

Both interpreters are allowed now, any block rule against either is found and
removed under one prompt that says what it is for, and the result is **checked
afterwards** rather than assumed. When the prompt is declined, the QR panel says
so on screen â€” the person scanning the code is looking at the HUD, not at a
terminal.

### âš¡ Nothing heavy is loaded for a feature you did not use

`pyautogui` is 394 ms and OpenCV is 224 ms, and both were paid at **every** launch by the folder scan that discovers actions and plugins â€” whether or not anyone asked for a keystroke or pointed a webcam at anything.

They are imported on first use now, across twelve files, and not one of the call sites changed: `computer_settings.py` alone has eighty-six `pyautogui.` calls and every one still reads the way it did.

| | before | after |
|---|---|---|
| discovering actions + plugins | 462 ms | **216 ms** |
| `pyautogui` / `cv2` / `pyperclip` at startup | loaded | **never** |

> The cost turned out to be a hot potato rather than a line item. Deferring it in `actions/` moved the whole 394 ms to `plugins/`, because whichever file imports first pays for everybody â€” a deferral is only a deferral when it is unanimous.

### ğŸ§® The same tools, in a third fewer characters, for a small model

The fat tool descriptions are fat on purpose: `whatsapp_guard` spends three thousand characters spelling out which phrasings mean which action, and that is what makes the model get it right. But the model that needs those three thousand characters is not the model that cannot afford them.

A declaration may now carry both â€” `description` for a model with room, and `brief` for one without â€” and the short form is used only when an engine has asked for a tool budget. **Gemini receives the full text, byte for byte.**

| | tools | characters |
|---|---|---|
| Gemini | 38 | 54,757 |
| a local model, same 38 tools | 38 | **37,230** |
| a local model on a tight budget | 12 | 11,615 |

Nothing is removed to get there. And `tier` â€” the per-file override that decides what survives a tight budget â€” was documented but never wired through the loader, so it had never once been read. It is connected now, which is why `send_message` and `file_processor` stop being cut.

### ğŸ©¹ Fixes


* **`open_app` was a command injection.** `shutil.which(name.split(".")[0])` accepted `"notepad.exe & whoami"` because `which("notepad")` succeeds, and the whole string then went to a shell unquoted. Verified before it was changed; there is no shell on any launch path now.
* **`desktop_control` asked a model to write Python and ran it.** The rules â€” "NO subprocess", "NO file deletion", "NO imports" â€” were sentences in a *prompt*, with nothing enforcing them, while the namespace handed the generated code `getattr`, the real `pathlib.Path`, `pyautogui` and `ctypes`. From inside it, `subprocess.Popen` was one line away. It was also the only tool in the project that broke the project's own architecture: every other one declares typed parameters and lets the model fill them in. Removed â€” and nothing was lost, because typing and clicking is `computer_control`, multi-step screen work is `screen_agent`, and files are `file_controller`.
* **The screen agent crashed on every machine without Pillow.** `import mss.tools` inside a function made `mss` local to that whole function, so a line five above it read a local that had not been assigned yet: *"cannot access local variable 'mss'"*. It only fired on the branch Pillow's absence selected, which is why it looked intermittent.
* **The voice changed accent at random.** Whisper reports a language for every utterance and is confident about all of them, including "ok", "hmm" and "thanks" â€” and the voice followed. `language_probability` was on the same object and was being thrown away. A switch now needs both confidence and enough words; a one-word reply keeps the language it was already speaking.
* **Chrome opened twice, on a profile with none of your sign-ins.** Asking to open a web page called `open_app` for the browser and `browser_control` after it. Both descriptions now say the second one opens the browser itself.
* **A locked Chrome profile cost 25 seconds of silence.** A profile can only be opened once, so with the browser already running the launch sat on its timeout before falling back to a profile the user was signed into nothing on â€” and said nothing about it. Whether the browser is running is a question the process table answers in 150 ms, and the answer is now reported.
* **A process whose executable path could not be read was not recognised as the assistant's own.** Self-protection compared full paths, and a path comes back empty for a process that is exiting or that the OS will not inspect â€” so a `python.exe` belonging to this very application could become a candidate for closing. The name is compared when the path cannot be, and a process that vanishes before it can be touched is no longer reported as one this tool closed.
* Search results and file contents were shown to the user with their untrusted markers still attached. Those markers are for the model.
* The activity log filled with tool status lines. It carries the conversation and problems; the running commentary belongs in the terminal.
* `computer_settings` said `Done: <action>` whether or not anything had changed. Volume, brightness and dark mode are read back now; a keystroke sent to a window the user is looking at reports what it did rather than what it achieved.
* The `model` field was declared as free text, so the **LIST button had nothing to fill in** â€” it looked like a button that did nothing.
* Changing one pipeline slot **wiped what had just been typed** into the provider above it.
* A tool result whose call had been trimmed out of the history is an orphan several servers reject outright â€” and one a model reads as something the user said. The history window never cuts through an exchange.
* A model that emits two tool calls in one turn is not asked again until **both** have answers; the second result would otherwise arrive with no call to attach to.
* A generation that fails still ends the turn. Without that the interface sits in THINKING for ever and the stall watchdog reconnects an“æGˆğ¯ÆĞçŞ¯~%BrÑÖCÕQ­¹:”w‚è{•û³üaŞZùveÌŒúrR®PØh”²±s~Üç6M`µ¨Ÿ”êÃº3ö8#‘îj´èÃnã)<VƒLEçè¨š ›Œ?{
‚Æaõe ¾\÷¯¢—·²h³I­ïû-P€–b.@¶0Ú ™Ë€õIïD9¯`9]«G’ú8">' N,
¯fqM R[)ŒN`Iü*Ybõ' GÅ>q0Õf|d,ÀËEYzÒbop\R<)´ZM‰Ğ]l­1ÿ`b%nìjPë8¤w5zÉ$±Ã%W|í|çãŠ"ıZíN±sñ'Áx±¦À>ğ)ÁgX<V?6‚C¯ÜÈÉW7Òñaãå.^X]ôÉ#sWù „_;iéËã•EB°%}c‡ËÊw%µÒ¾˜ÅâÁå=ÁCšSó#õls3Ot¹A‡×£¹,´øy²‘ô[ÂœI¸ğUUâË‡şNbš„¨¦Iwôåbï[Rµ†¬×uŒKˆ{4»¥gi_Ê¬Z[—åf^h]àé-7sÉ£Ğ^Ä)Uù(ß÷š(ƒrTçª}vc£ÃÔ7.É¶¼3„]±•çX)8P’úá±»¹–èá©<ºì}}G„=?–£6èĞmOóşGØÛ°İ˜ïè©9b°ìÎ 4)ˆÔí‡¸*às¥­©&ÎóäêSúL`Såz^=îy GP®â:î‹aî{‘I.vuL¥ÙÁmU"º?Úñ9ØT;M–$$“ö@¢Ú¼Yw®øNcù.&z÷%ëÿrNu0Z'u Q{´^E:s"¹iÆl—~+Y3xbâûN)”4:"wkríÙ8ZL«¡kfKdp¿c%On0izfk5aRö{!ûIEQ ArReM€eNO±@Kv –§ry‰-n7FBÁDRÜí<(/S‘(k1Ùp?jqCY`|oR1·ŞV7TsgnI³å\;K } s}PinÂaÉzAa$tkB{CAĞ³3ÔtQ@I63Q%^~6\(wy#l2¢¹*XÖ\ìNFI¹xÀ¹¸`€;/Gc@%‡icƒíF@õeC¿4TQQBzv¹uéTÓÕß¡2z9V0{cÆWåwkTp÷uf‚ŸM=6:>KGpfšxHOPP;‘ti#gW…8=6Gè>Rÿil(ø\‡®'ş_¢ÑÙ…^J¤ƒ³3Yxr1>$PéÈHY×w9bdH>•CÏµõ±ìO*Dcá/Âv.¿6{%§G;w,´7àt}:?uêp:ê9@Wx34±Å=Ryesj”›F>ñävÁa"7sh7%œudÄ  $uZU?rDIì(7)ªà=gì|.5TÌNk!7E_3ríoöf~}ñ´c¼C¨6´{Q1°Šøír/¤7N²é4(S3É|,çhğrZÿÔõy]S$5cF–'–'âPA.G.ª3v`}Är&j{(i« -ŠpY÷0Ñ+Uitc;>{knå±|&´f>vx¡6S™ b@9.W|NtL_çAyG'NàqSñ8®ª°,ÙkiCınXfu!	(uúêw>ÜÇc7›&±
H”6|H.’•me9pà9g;'Nï!÷á=Zupmés}×ú!œrböüb4(%znw%¼L30o0e.eq%¾4M~Í©+c‡hk¢e!j€)gw35¤5fí¸* Mõël=~v¹,ùö·"x9şç,cg¾hUth;*Q	Il©ğvd7u²Ç<}‘¶´æ, =w s1AåiŒe(eb##J&Îh]mı`X:~|i£¹{y)>¬**(ñSµpfï%Iq®V40 eí(}Bqæn«b-#PG8—­õw½-DYş¹rwú®ti=Êë@W+nÅ#.d}U$ç(ÃŸû0©/ôj9¬&>Osb/dù'g<#ë¾ö:uøJæzKi³hZow"­èT¥/:ôLB , Ï ¦cğ1Ó5(Rª~*ƒ&ä°'ZÈqûZq'›Caxãm£
aªTŒ©ßb|uÕOäz‘,qÕDn±%Â»Úëét$?ôYÒáÉËAt(849²xd¡qG}¸ª9êV:_A¼M%Ğ{K8èê]wRsP3]¿A ½|`(øÔV-[‰’¿n$onÿõEBÛEq¼â»C8Nï~ds!'!N¼9{9thL|	‡|4?â,ø ¿à¹rj½-JWo©k`+\"%Ô1õ9¡arCú(	5-¢AVQma î±ö#\<C†m$d»Ié93ZMj«J_f1*?¢sRvtppJñ´Y0Y#(33k&eit/-W>·jº.¡8->¬r*zºt/a†g$4T*Wç4Akaå(f)FU"¨N}"b`xâÙgH {nhnE:Æ	h±l @é­àúÃ»…êç=®É8äo¿X'~z\”= ’)×ob~^ï&P¸?$÷%®f¤|}'Ò”®+R[p%8ù`'}WştdJ4ju5î9â Ì:‘HH66è¢z®G4f ™7»4íJ|M¢ì7}(VğPà0ózh;4&¹f~.eIIˆkR2?cBî/nv)¿zBŸi.„`SÜ	ınu£4ÖF$´æV°qåª=Eæn<|38fl­.ii/@H¼`ÿaõean%3f`¾Í.ºNv-bw-Æ™ wì2š	#’Î>{a™uõm¤KL{V!=ÍÏ0wa5œ`5T\o|X%g7÷|i 6s99`n0ş),ÒH¹ßñ7µ¬à õ¢(-(ãIçÏ`we9,IÑE{¸mn1gW;SL#1Õkc}Ÿæñä¶N¯pÎ€ldv\’n‰ÂtpÕ¿y1C4,9ƒ¬3(i2íx2?v…5D\}Åmpc<|)Zó„!$âµYy#d+Ç‡p°9 &×^V$hà:&&+>Üaw u4é2<68iLSdÖ/Õ2!j¶êƒ~!Du,zgxK|Y~D5÷):4v#Rn¹FŞ!7q$Â``r9/ 6h
$D7ÌË¶ÚÅ|øo~`s& {5|=Eüè7/%se³89Ò `$†_–ïJDƒ$²4dm5p¾~³iû ½§X<pRÑ"rnM¨YuæB*¼à{,&"Ë#y),³²`, ¯|d%Aææt.whm}@ij8ª!Å˜"¤wE1İÂE{P.Ã9²gf/A3,á6ëW"!k|B>lrZ—w0Jf3ssoX>7eb>äxÿUSğŒ&cgx ¯$}:ï]óos	şëCå< 5l\z|V$¡cöô<)#"p<}­SÅ\a)xrì¹fT¡0q¬ÚaJRt,)³8<oíŞ¯gaÉ…ED¸}^-Vxñhe"ô<%¿)và.:+U $0@6çRB)¦U5OõrZ@ŒAk13B=,"ÊLIÅzm¯qUÎª4W5ebUçm-T Ä]Ë9#fN.\HnECöË‡
@?8>üî6}@b½0Mzf<aŸTät%bÄÙ¹?/]^Wj‘QBNTm{ß7 *•i›8ú0,Åêcuoúùª3ir","óEo0+”¼d:l9{n/§=8OBCq·T&q¨PpkxáMæM»ı6z
qd>‘u9~+*}D378År_:\Ï”0Drd§R7J>ljóò #N#WW)Ê+9h}¹-¥oø=*´<µ˜	1y<Eè-Û( l<AxO9-Y( e*¯ro0yan{k heü1øõ<w0Ñ<=i’ :Î&[-lYâra2p)W,}+;˜ò»Šf~Ñrø(A32 ¢l&iÒ dÊ- ´aÏ_İbc/+hO¿(8`%İuN(cr¾W2º]¶:$"qr>?V)q+}¤?#-ñ dNt0¬rRldUDvH<pi3h[y5áa_$mU¸¨D2ç†½
ô$½’…	şOeByhXüÔ‚Òå0äî4,'k‚§¶?w()]4Gr¶Mv#1´a!/O82 .L/]zú!êlt7=wÅ<j:‘¨Úå¦¨o‰a¹®3´qb4xn:zpy"âi¢¶c}:”>a-8hhf¯Q^åŒd1mAt)(³vj2:`>,}-ù%T[0]0r¬,vgh:Qw<'wt+0+aQ?k#u+\Ónuqä>š¤h¼/ e‡d÷½75}D"9U=›-uåj5X¾cHæq‚›ÖKX'Ø;4E»Fe-|H%Âw(j¨‡»!)	*EEH6BOH»g*²mĞ`gÅ.KhfQ5˜<ÆL+hÌÕoY}M!ÓH}UhP{rôRpq3Î"óñ¬gß#l:W	;óJd8^ëb}MŒ~(x#V!A$X-%Ùp<S8Dééè>!ğ~4štåH#ÆnÅ+J¿;'G(lO`—3t)6gEpJG%6n}AÄõ$Í1«" s%rRdE$ø`9.â)¡®BÿßÏÔq—s)}\zyüŠZd¡Úpµ(-g¤
ôF6 b•|¢¥4Ô{À'xÌıq*"(¸gL=2ckº ,p¿G¾eä~m7la'FÈ)Z±S1şn‘˜OĞn8yÓK.tgtNJ_úV~0g1€B6U{yTk'õüZUgeú8`¤wuh`9Y>mJöw1N×Ö—jmO
A>‰'·INdx>/xdõgØn²`*ít3Pü'amjèakN?ÖÓ
82|B¶:Ua¤|liPm~r@hd°–b÷péi5V«s4èSËLa¾n·„”%&2û-5ÔëSz'´ö1·1yxeª÷”Yy/‘; +c·iQæ`¢q©F~p‰ğ¿_'qw;`;{=c‚Q&èsêbcs!iF-Ghejh6`náßl-SgÕj oz:Kq7=^}ùÈm÷4K(iî­b{Yˆë*V]X\ ibp3sx{+>ğ$3<b=Bg|ARgˆ6pi¤ {İã$<-$am77=.­rD-A}Ei}xf+|jŞq(OĞ4lø8äHi±nhE:-IR{CJ0Yy­…ÒÏ¶Çà'ai>;L¥*#/9{rç³s=7ñw(kgaE‘Jáhd~%nã\fh«ºG¬6=qyND.<°ñâè-i2b^ÚN®¤EQ/j;OT>t´ÿ‚`^ Öl‡M#,uÂq¡VfAe B"~ˆzÉ
zyùm.SusHLa’Ç1Ó„¨
­H óx¥`é—Ø×x­Xut1¾˜^K¡úç]º¢µù¼“ÈÚô|"sc*
aİgµ^ò×)É¹ùa»¸†“Q}ıZ>ûÃÕÁÃÊh_Ä˜ìbC}(,1¸Å¾J¯O7œÙÅK"CoVÍ$yR^.æ¦±Õ˜©éTc"Š¼én}ôÖ‰d±Jü•%€x¹í=í`.½×ÛèÏyı:ãuhüDH­ gÉH # 5Œp
Œ¬wc’Æ¾…ßµgw¢&ÚŞ	!ÍzeZ¯õ¨ó`ûfÌtcmÅe"&(J{-¡q-c^&ä$²õº#ij½D{(õ-›‹Õ×Ì!ÔDJê5,¶…8{‹nÈmOx+</Zr»U¸îÂ©C<lÖ‚W­ ÏÌªü®­ëZ “U{ŒJ¶aCt¯°:"3¦Íæ£IÖ7SF’ÓôxXbŠ¢	¹öñW2Û¯9ƒ7ûy
qÔ-4ã´g#,v±M§£çP«w#øæ„‚ŞùÄ˜êâm)T1ÚM–šòéš¸['•Úß‰ü–c<LËZV†”íóh8Aşçgeæ AM§ ¬í¡ÇÚäB—§×2DµNoûtšªÄ
…Ø=ªš«|t`a
¨b$2.sF*aá•g]$VŞu)1P}/7Éª@ r ¤û|•XgØŠc/eH›{Bx|%'k1!Ô0uåOv¤!fcMx5<uF.¸w&òåjg¤Ym@U5+3Ñ*<Ÿ)aşô–Væj8'\ 	ï'ÕW 0º‡)P.éì%øÁ;°9/‚ uà*` úlg3Î*ËôO9pdw, +ê;ßq+bG³ÏI\*Vôú‹Of3%a2s—h+d	%J|cY-=¦¬M³l9¥Õ#BğOS<e7à)övôz©}tøe;àni#â‹s+Ñ9;g%Uqöîâ&f°»4´#))r¿(HXf’µL+g,#{|¨v€6R*e}^G¢HÅZCqXëj]Ùµ6®Q%P*+mh3hš„âãNí$9pşI…Z®;¦/1äî$d|	­®zB}zI]5~¼AÏf^-+0{tùr4ma„¢Å-pµn90Ş±_Tih9é÷$Éñ?„Ow<vT¨àkUw!@$;R­úvqu=à¿_ò*!â<o‰VY;+vpV®QJ|Prn»^¼´'80ûÔ†¾[óO¥8R[p  q‘åR}zpZv<~+´9oèÓ|-ìsÍdy;b*dV/g%äKêã/YN²¥qc+•4fÉé?xi¼˜rÕ)4O±aJhZym3+csÅ-`Ã?¦¢u“"ÇÖø×‚uê7HZoVå9)6opgmÔÔNkUT Av"ByKO‘LÖ¢sgêZE-¿±yk7Ã¦:N9£@özO3u…7…c÷\n¾¬(~;Z3t6d?n	Špìsw×baw£ş[%4Höy/°BX‘Sk(ã7>¼ÿeá|b()êªx\{Tx¥®Ó;«o8%ì8F‹#*cé 1¾BBU)Ek575kÓ7)!.’JÁ;y4c-<3ß=ãF+…l2%bWPst"á¨nBÇl)f[-j0xº—”tz9Cè²u¿Î¤*5mdÌyÔµE	Ù)°v©ã=u™ŒH)>9Ö…7Bì l~#ë~±VNZjZfcğ¼ 2i:>›FL³YM:ø¨i>	&3M$2A¹Xm<Z%% pk5oh:=ìo»Î@¤çQSÄ ®0f%	kLayT348Û,92:PX3P|<C%"+fK3:½ôSS5z!¿_9Æ¹={8=Bõ\u.æ=láW¯o+E0Ã^Vfv#áaaÂG;{óD	32:¬NU÷=Ly’QBu¯4wF÷sp“ü’°[.?ú*vx>-6müC·s=r}I¨q+(.Iî9¤WQf0æ×'©Ê&aı|o2¬>v£zhhãm¯uE½õç fdd=feT\ì[3äà¹54–Å]KL-Ò6ód2 ;ã+9 F/ÄÓìÖ¾½ëØäèhîK.21n,b‹Ezí$¹åE9±lX5¿Dq,9c&A§bAÇ${xô7hAø²¥lÖ*yƒ)b}zrjfªj:­ÎEnªÂÓns;hÿ07ç´t€ğ`))4#I5
,I:yhlz„ ´9‡quõ#3n"+™Ha;iğÄZ¥>ZmÙhú}‘F@>ê={w”5-•*9+wY('Öî}"FvBSn!rãĞ[kà˜Ä#0Î­¤^,x5,p+³h
g¦ai9­÷={f'qg*<3ì;Şu&pi~èwÛjşHad	õ){e­|3;Ú¨,GQ8< E>g5oğ§wÙ=1:E6Gs 4O9PÏ4Z^u#t!!VM*M0Ä{«MXz!Í|Lv¬vÇqv¬3Bù¦l--n­C¶h? xê J@¬½3!.RRJn5RaˆüSzÙ™jµXI¿rŞ1¡ã9ê%osÚCïFzU#˜’!N;né§®,¸~w.¨0£zwî2rbf+XèmúioqI"8hG©½ê76&cmwehT"h7hf)m•.,6-mXm/e|0¼ZGõXw¡
Cpî&riPYÛ»ûM"¯âò.'¨'éc>êFo[jÌWn8S:fXIY5± ×E^Vš;‰(úĞM°èZ@6,HìsaN$æ¦l¶¸50è#5/c/JKN‡wõ6oÿ«$(!¹xuilMV^u1$)é;®haàFüm/5úav*øx—zKvQcx=êF(gc#s*¼tJh×FhuZhìiM	~MÖ
”Ì5%õŞgƒ÷(([pUaPp¯¦xiqåYì<¡-#c¦Âi?$Yøm;=f,z3!®¨¼áêƒ0"rif+2WN~/ırÎ)Ap8é&hå=/o3¹!7v´94¨(Q rÙ,y}(vì4+cŸ1hŸåcèEì~îÆl'orUnBJ?;m}ƒ¬µ›XøXd­>	u@²‚ßGtN|fÄ‰½rxf-Qu¾p°Úâï^zß£Ÿ«Ö:U˜öÉƒ¶TÙU´1›‰…ªê
òp[$øíWùóºq–º‹úÊd $U\ùA ¯óE€ó¾ºGëeÍa;Ã£¾dŒ™1îUy@şñŒ^+e8–Gã¶dÓÉÚ÷–ä °Eİ.îº¤n¾PÉIÍGÔ¬ ÀìÎ²>üZmŠ¼î_Q†ôµ‚Kw¹¾óş®ú¯˜‚1‡ÖLù—hœÆ®)ù´Ï¾èmm§ÙXÅ0ê‘O²Ëˆ£°
©5®Äñ-26'Ãæëä$_M6Ş¬®ya×ÿã­,ßù$à\³<5Ì.ó0XõhÄXµı÷©F&íTá™,Ä@¯’h~Uñ2¯X¢uœšö¿ÕNAQRş\­“{fä740yÙ Ê:5LİL\õoxŸ”p„MQåve³‡:Ïé&ZæDU.×fy[¿Jc	GP&}5;æIa›å*©˜_ÅX–À*¸"Åã{€¼ªXcãĞLœ«VBj/
öLÊ@GÊuz3LÇ¨.ÄòºA¤ğÉóYY”¦MıÔ®mëš‡£7·æëéD°Ñ+Ö&ÛšEÜ+ºà˜€àÆ=”›ö4¸Ò@ÉŒl«óT]œºâ¿šEaQ¯]SÛ:`Vğ#3}5ı2SÄŠl­L|õ|8œæwu'Ï²!•JA ÌÊA¸Š@ò%‹#+I1—v½uOº… vL„rÂjs0şÁğA³V½ãÊ[İB;æY5ÿ—‘p‘…Fëøáw¬¤ ‡jv`z}û_nPXJt|*à!1]JR,:<äSl¦ğ’Yúü+<|K252}l<íGr	Xs-&3¯e6‹µ#l¡ZmgwÄu¿ifÅĞ(o¾QN\Fş­o+Yš2vÂà9=1=(èEyvbZV7
<8ábcÿ€HiX†?¶¿ŒÁqíŞsMû»nÉ¿…N>…CÕ_´’¶Ê4­- uÅĞuô:$9.6‹iQ^x&±P|6ÃTÛñæ àcØü&û\(chç5²Zs73 pï#,6?+	·{](@=acQ-8`Ê6(«bcèÂÆ[¼NafUmj‚Ğq%*2C8!T~bqz:v'!{·¡ñCAm•«A¢S+·=ı(RB4EAìÜEı8IX¸gv8J¥-hIº¬=N}H>dáuTv,˜3?—w/(f¡1ı$\L7=õ*MDmjÖŞ|&TæGs=³­­7Ó	<ÓeñQF·~àî£6ªIL{^´=m–Œ'g¹¯JáLn5ùZz1,É/Ğ(ÚÜ.-X ó3¨%&{h&;
¹#§|0½6%ˆï’syd¯4ïëŸÃE™æŠV¹8Uê¦£—¶Btñn€·â3¾P²y›.Õ£ÕÁ¥Õ7Tbáß“ú9ı m-³s4©è³i"	O‚ñ¯ìĞ(T¢ág/r3J<•KédŠ‡’ ¨¯ûşb+Iİ‘SJ2Aî…)ëJTÕ+A/äÈ¤$ö<¦ödár@€£G·ïhŠˆ¿7ô±u)U\õ”ênãÙK ÀRlŸ´E`qÊ 2M…ç§<h‹L3+Åkf1 i5qs¨¦sş`n ı¢§—-¶Œ0B'ì°Ït½-3q`fm?(S½¿BPcs¢%«RÈ/{‘«>dr[p>ğ2irrB0t@åÿy¤&õF™4!od2¾xÚ!™±6¬#ÿüwDAfC‹İ­üz1	@kxea1<ReI<h#OT“óJnss but its author's. **Not everyone updates games; everyone opens applications.**

Mark LV trims it to **twelve**, and every one of them does the same kind of thing: drive this machine. Applications, the browser, files, the desktop, the screen, the clock, the weather, the display. The rule is written into the project tree, so the next skill lands in the right folder without anyone having to ask.

This is not only tidiness. Every bundled skill is declared to the model on **every** connection, whether you ever use it or not. The declarations sent at startup dropped from **16,827 characters to 12,907** â€” roughly a thousand tokens off every session, and five fewer wrong tools for the model to reach for.

**Nothing was deleted.** The five moved to `plugins/`, where they still ship and still work â€” a plugin is loaded the same way, gets the same HUD and the same undo, and can be removed by deleting one file. The rule the two folders now divide on is what a skill is FOR: `actions/` drives this computer, `plugins/` is everything else. That is why the game updater, the calorie counter and the pushup counter are still here, one directory across.

### ğŸ©¹ Fixes
* An unanswering model was retried on **every** call, at 12â€“15 seconds a time, because only quota and 404 failures were ever cooled down. 503/504 now rest for 30 minutes â€” **11.2 seconds saved per call**.
* One-shot Gemini calls had **no timeout anywhere**, in any of the sixteen files that made them. Every call now carries a deadline of at least 10 seconds.
* YouTube playback failed outright with *"Requested format is not available"* â€” it was asking for a combined stream that no longer exists.
* Videos played in a **random language**, because YouTube's auto-dubs carry the same bitrate as the original track.
* The settings drawer **stuttered on first open** â€” a 2.1-second `openwakeword` import on the UI thread, not the button count it looked like.
* The settings drawer opened **underneath the video**, because `QVideoWidget` creates a native window.
* JARVIS **answered the video's soundtrack.** The microphone now follows the video's sound.
* Qt's multimedia backend printed an ffmpeg banner to the console on every play, containing the **signed streaming URL with the viewer's IP address in it**. Silenced at startup.
* **Every launch paid 201 ms for a plugin nobody had asked to use.** Discovery executes every file in `plugins/`, and `youtube_video` imported `requests` and `youtube_transcript_api` at module scope. Deferring one of them would have saved nothing â€” the transcript library imports `requests` itself. Both are now checked with `find_spec`, which answers "is it installed?" without executing anything, and loaded on first use: **plugin discovery 211 ms â†’ 39 ms**.
* A plugin that needed a file from a **newer Mark** was rejected with *"pip install core"*. The loader could not tell this project's own packages from a third-party one, so it told people to install a same-named stranger from an index â€” wrong, and a supply-chain hazard dressed up as a fix. First-party names now say the app is behind the plugin and that there is nothing to install.

> Built on the Mark LIâ€“LV foundation: the **ğŸ§‘â€ğŸ¤ Holographic Avatar**, **ğŸ‘„ Lip-Sync**, **ğŸšï¸ Push-to-Talk**, **ğŸ”‡ Self-Echo Guard**, **ğŸ§© Plugin System**, **â™¾ï¸ Unlimited Sessions**, **ğŸ¨ Live Theming** and **ğŸ™ï¸ Wake Word** are all still here.

---

## ğŸ”„ The Foundation Update â€” in every Mark from LII

These four landed across **Mark LII, LIII, LIV and LV at the same time**, after each of those releases had already shipped. They are not what any one of those versions originally introduced; they are the floor all of them now stand on, so moving up a Mark never costs you something the one below it had.

No new dependencies. No bundled asset files. No hardcoded language, and nothing that assumes one operating system.

### ğŸ§  A memory that actually remembers

The store was capped at **2,200 characters â€” the whole memory, not per entry** â€” because all of it was pasted into the system prompt on every connect, so growing the memory grew every request. When it filled, the oldest entries were deleted and one line was printed to a console nobody reads. An assistant advertised as remembering "projects, preferences and personal context" was in practice a two-page notepad that quietly forgot your sister's name after a few weeks.

Storage and prompt budget are now separate problems:

* **Nothing is deleted.** The cap is a runaway guard normal use never approaches, and if it is ever hit it says so in the activity log instead of on stdout.
* **The prompt carries a core, not a dump.** Identity in full, then the most recently updated facts, budgeted â€” measured at **971 characters on a memory holding 62 stored facts.** That is *smaller* than the old whole-store cap, so sessions now connect with fewer tokens than before.
* **The rest is fetched on demand.** A `recall_memory` tool searches the full store locally â€” no network, no second model, well under a millisecond.

The part that is easy to get wrong: **a model cannot look something up if it doesn't know the thing exists.** So the prompt also carries an **index of the keys** it had no room for. Without that, "who is AyÅŸe?" gets "I don't know" while `ayse_sister` sits on disk unread. This index interleaves categories rather than sorting by recency â€” sorting like the core, a memory with forty preferences pushed the one entry the index existed for off the end.

âš™ â†’ **ğŸ§  MEMORY** shows every stored fact, when it was learned, and an âœ• to forget it. Everything stays in `memory/long_term.json` on your machine.

### â†©ï¸ Undo â€” it can take back what it did

JARVIS moves files, renames them, writes to them and changes your settings. None of that had a way back; if it misheard you, the only remedy was to fix it by hand.

Say **"undo"** â€” in any language â€” and it reverses its own last action:

| | |
|---|---|
| **Files** | move Â· rename Â· create Â· copy Â· write Â· delete Â· organize desktop |
| **Settings** | volume Â· brightness Â· dark mode |

Three things it deliberately does *not* do:

* **It does not guess.** Settings undo reads the current value *before* changing it. Where a platform won't report that value, nothing is registered â€” an undo that restores a guess is worse than no undo.
* **It does not hoard.** Undoing a write means keeping the old contents in memory, so files over 1 MB are excluded and it says so rather than holding a 200 MB log for the session.
* **It does not delete your files to undo a copy.** The reverse of a copy is removing the copy; the reverse of "create a folder" is removing it *only while it is still empty*.

`organize_desktop` gets special treatment â€” one command that moves dozens of files, which made it the least reversible thing the assistant could do. It journals every move and puts them all back in one go, cleaning up the folders it created if they're still empty.

**Undo costs nothing at runtime.** It appends a closure to a list; nothing in it runs unless you ask.

### âš ï¸ A confirmation the model can't forge

The old gate read like this:

```python
if action in _DANGEROUS_ACTIONS:            # {"restart", "shutdown"}
    confirmed = str(params.get("confirmed", "")).lower()
```

A **tool parameter, which means the model fills it in.** Nothing stopped it sending `confirmed=yes` on the first call and nothing checked that a human had been involved. It was a convention, not a gate. And its coverage was two actions â€” so `toggle_wifi`, which cuts the assistant's own connection to the Live API and therefore *cannot be asked to undo itself*, went through with no gate at all.

The token is now issued by the interface. Shutdown, restart and WiFi put a banner on the HUD and **return immediately**; the action runs only if you press CONFIRM. Nothing blocks â€” JARVIS keeps talking while the banner is up â€” so this is **cheaper** than the old gate, which burned two tool round trips for every power command.

> The split between the two mechanisms is about reversibility, not about how alarming a word sounds. Anything undoable is done at once; only the genuinely irreversible asks. An assistant that checks with you before turning the volume down is one nobody uses.

### ğŸ§ It finally asks which microphone

Both audio streams opened with no device argument at all, so they always took whatever the OS called "default" â€” and on Windows that **moves on its own** the moment you plug in a headset in. "JARVIS can't hear me" almost always meant "JARVIS is listening to the webcam".

âš™ â†’ **ğŸ§ AUDIO DEVICES** lets you pick the microphone and the speakers by name. Two things matter more than the dropdown:

**The list is short.** `query_devices()` returns one entry per *device Ã— host API*, not per device â€” measured on an ordinary Windows machine, **41 entries for what the sound settings show as 4 microphones and 4 speakers.** The same microphone appears four times, under MME, DirectSound, WASAPI and WDM-KS, with nothing to say which is which. This is not a choice, it's a quiz. The picker takes one host API per direction, drops the "Sound Mapper" and "Primary Sound Driver" pseudo-devices that just mean "default", and deduplicates. **41 â†’ 8.**

**Every entry has been measured, not assumed.** The obvious approach is to pick the host API with the nicest names â€” WASAPI on Windows, which in shared mode **doesn't resample**, so with 16 kB in and 24 kB out against 48 kB hardware every open failed. Adding a rate check and switching to DirectSound passes that test on both sides, and PortAudio's DirectSound **output is a silent sink**: the stream opens, every write returns success in ~0 ms, and not one sample reaches the speakers.

| | write(2.0 s) took | |
|---|---|---|
| MME | **2.02 s** | consumed in real time |
| DirectSound | **0.00 s** | swallowed instantly |

No capability flag reports this. So the app measures it â€” once per host API per direction, on a background thread at startup, using silence. Two consequences worth stating plainly:

**Each direction picks its own host API.** On Windows this lands on DirectSound for the microphone and MME for the speakers â€” a split no amount of reasoning would have produced.

**The probe runs in the mode the app actually ships.** DirectSound input passes a callback stream and fails a blocking read; probing the wrong mode rejected a microphone that works perfectly.

Your choice is stored **by name, not by index** â€” indices shift whenever something is plugged in. If the saved device is gone, it falls back to the system default and says so in the log rather than failing to start.

### ğŸ”— It stops forgetting the conversation when the connection drops

**Session resumption** was switched on in the config and the handle the server sent back was **never read** â€” so every reconnect started an empty session. A dropped packet, or simply changing the voice, wiped the conversation. "Unlimited sessions" leaked through exactly this hole.

The handle is captured and replayed now. A network blip, or switching your microphone, keeps the conversation intact.

It is held in memory only, deliberately: writing it to disk would make a fresh launch continue yesterday's chat, which sounds appealing but breaks the session-summary flow â€” a conversation that never ends never produces a summary, and "yesterday we talked aboutâ€¦" line in the morning briefing silently disappears. Changing the **voice** also starts clean on purpose, since resuming restores the server's session state and would likely bring the old voice back with it.

### ğŸ©¹ Fixes that came with it

* **The assistant could die on a log line.** Status lines carry emoji and arrows (`ğŸ“¤ file_controller â†’ Moved: a.txt â†’ Documents/`). On a non-UTF-8 console â€” cp1254 on a Turkish Windows, cp1251 on a Russian one, cp932 on a Japanese one â€” printing one raises `UnicodeEncodeError`, and because this print sits *after* the tool's own `try/except`, it escaped into the receive loop and took the session down.
* **Every computer command paid for two model round trips.** `computer_settings` made an **entire second Gemini call, inside the tool**, purely to translate the request into one of its own action names â€” because the declaration only said "The action to perform", so the model rarely filled it in. When that second call failed, the fallback was `description.lower().replace(" ", "_")`, which turns the Turkish for "turn it down" into "sesi_kis" and straight to "Unknown action". The declaration now names all 56 actions and the rest is spelling tolerance handled locally by `difflib` in microseconds. When nothing matches it suggests real action names instead of dead-ending.
* An unresolvable saved audio device, or one the driver refuses to open, falls back to the system default and says so â€” on both the microphone and the speakers.
* A rejected session-resumption handle is dropped after one attempt, so an expired handle can never be replayed on every retry and prevent the reconnect it exists to protect.



---

## ğŸ—ºï¸ Mark Roadmap

| Mark | Focus |
|---|---|
| **XLIX** | Auto-start Â· clipboard intelligence Â· assistant customization |
| **L** | Session memory Â· background monitoring Â· proactive 2.0 Â· instant vision |
| **LI** | Plugin system Â· affective dialog Â· proactive audio Â· unlimited sessions |
| **LII** | Voice picker Â· live theming Â· reactive HUD Â· recallable memory Â· undo Â· real confirmation Â· audio device picker Â· session continuity |
| **LIII** | Wake word Â· Gemini 3.1 Flash Live Â· instant acknowledgment Â· self-describing action/plugin architecture |
| **LIV** | Holographic avatar Â· viseme lip-sync Â· facial acting Â· face-as-status Â· push-to-talk Â· self-echo guard Â· runtime self-knowledge & limits |
| **LV** | Video on the HUD Â· model ladder with measured fallback Â· split settings drawers Â· trimmed bundled skill list |
| **LVI** | Choose your engine Â· local & third-party models Â· Whisper + Piper in ~50 languages Â· language-following voice Â· ElevenLabs Â· tool budget for small models Â· verified outcomes instead of claimed ones Â· close an app by name Â· untrusted-content boundary Â· platform honesty on Wayland and macOS Â· hardened phone dashboard |
| *shared* | The last five above also shipped to LIII, LIV and LV at the same time â€” moving up a Mark never loses them |
| **LVII+** | Interrupt by voice Â· conversation history Â· full file access Â· security camera Â· Obsidian |

---

## âš¡ Quick Start

```bash
git clone https://github.com/FatihMakes/Mark-LVI.git
cd Mark-LVI
python setup.py        # installs deps for YOUR OS + the browser automation engine
python main.py
```

`setup.py` only ever installs what your operating system needs â€” the Windows-only libraries are skipped automatically on macOS and Linux, and vice-versa. It also checks your Python version up front, so a wrong interpreter fails with a sentence instead of a wall of pip output. Prefer to do it by hand? `pip install -r requirements.txt` works too.

> âš ï¸ **Installation Note:** If you hit a `ModuleNotFoundError` for an OS-specific package, install it with `pip install <module_name>`. The optional **wake word** engine is *not* installed here â€” grab it in one click from **âš™ â†’ WAKE WORD** inside the app.

---

## ğŸ“‹ Requirements

| Requirement | Details |
|---|---|
| **OS** | Windows 10/11, macOS, or Linux |
| **Linux display server** | Everything works on **X11**. On **Wayland** â€” the default on Ubuntu 22.04+, Fedora and current GNOME/KDE â€” the system does not permit any program to type, click, capture the screen or raise another window, so those features are unavailable and JARVIS says so at startup instead of pretending. Voice, memory, files, the web and opening applications are unaffected. Log out and pick an Xorg session to get the rest |
| **macOS permissions** | Accessibility (to type and click) and Screen Recording (to see the screen), both under System Settings â†’ Privacy & Security. Until granted, those actions silently do nothing â€” the OS reports success either way |
| **Python** | 3.11, 3.12 or 3.13 |
| **Microphone** | Required for voice interaction (and for the "Hey Jarvis" wake word) |
| **Speakers** | Required for voice replies |
| **API Key** | Free Gemini API key (entered on first launch â†’ `config/api_keys.json`). Only for the Gemini engine â€” a fully local setup needs no key and no account |
| **GPU** | **Not required, anywhere.** The avatar and HUD video are rendered in software; local speech recognition and the neural voice both run on the CPU by default |
| **YouTube on the HUD** | `yt-dlp`, installed by `setup.py`. Without it, local files and direct URLs still play and YouTube links open in the browser with an explanation |
| **Aviation Weather** | No API key or account required. The plugin uses the existing `requests` dependency and AviationWeather.gov's public API; an internet connection is required |
| **Wake word** *(optional)* | One-click download from âš™ â†’ WAKE WORD (`openwakeword`, a few MB, fully local) |
| **A different engine** *(optional)* | Nothing extra. âš™ â†’ ENGINE & PROVIDERS talks to any local or hosted model over HTTP using a library the app already has |
| **Local speech recognition** *(optional)* | `faster-whisper`, installed from the same panel. **CPU is the default** â€” a GPU is an option, never a requirement |
| **Local voice** *(optional)* | `piper-tts` for a neural voice in ~50 languages, one click from the panel â€” or nothing at all, and it uses the voices your OS already has |

---

## ğŸ—‚ï¸ Project Structure

```
Mark LVI/
â”œâ”€â”€ main.py                   # Core loop â€” Gemini Live session, audio I/O, viseme extraction, tool dispatch
â”œâ”€â”€ ui.py                     # PyQt6 HUD â€” avatar canvas, waveform, log panel, settings drawer, camera feed
â”œâ”€â”€ setup.py                  # OS-aware installer (skips wrong-OS dependencies, checks your Python)
â”œâ”€â”€ .gitignore                # Keeps your API key, TLS key and memories out of the repository
â”œâ”€â”€ providers/                # OPTIONAL â€” delete it and the assistant runs on Gemini,
â”‚                             #   exactly as it did before this folder existed.
â”‚                             #   Never imported unless a provider is configured.
â”‚   â”œâ”€â”€ base.py               # The contract: Engine / LLM / STT / TTS, caps, Live-shaped events
â”‚   â”œâ”€â”€ registry.py           # Discovery and construction â€” imports one module, on demand
â”‚   â”œâ”€â”€ schema.py             # Tool declarations: Gemini <-> OpenAI <-> Anthropic, and the budget
â”‚   â”œâ”€â”€ audio.py              # Rates and formats â€” 16 kHz in, 24 kHz out, everything between
â”‚   â”œâ”€â”€ llm_openai.py         # Every /v1/chat/completions endpoint: local servers and hosted APIs
â”‚   â”œâ”€â”€ stt_whisper.py        # Whisper on the CPU, or a transcription API
â”‚   â”œâ”€â”€ tts_piper.py          # Neural voice here, ~50 languages, follows the one you speak
â”‚   â”œâ”€â”€ tts_system.py         # Windows SAPI / macOS say / Linux espeak-ng â€” nothing to download
â”‚   â”œâ”€â”€ tts_elevenlabs.py     # One voice, every language, streamed
â”‚   â”œâ”€â”€ engine_pipeline.py    # STT -> LLM -> TTS, wearing the Live session's interface
â”‚   â”œâ”€â”€ _tests.py             # `python -m providers._tests` â€” no network, no key needed
â”‚   â””â”€â”€ voices/               # Piper voices, downloaded on demand (git-ignored)
â”œâ”€â”€ plugins/                  # OPTIONAL skills â€” delete any file and it is simply gone
â”‚   â”‚                         #   next launch. This is where anything that is NOT
â”‚   â”‚                         #   about driving the computer lives; see actions/.
â”‚   â”œâ”€â”€ _template.py          # Copy this to write a new skill â€” one file, drop in, done
â”‚   â”‚                         #   A file starting with _ is a shared driver, not a skill:
â”‚   â”‚                         #   the loader skips it, and the skills beside it import it.
â”‚   â”œâ”€â”€ aviation_weather.py   # Latest METAR/TAF for up to three ICAO stations via AviationWeather.gov
â”‚   â”œâ”€â”€ _whatsapp_core.py     # Shared WhatsApp driver â€” desktop app or Web, all three OSes
â”‚   â”œâ”€â”€ whatsapp_call.py      # Place and end WhatsApp voice / video calls
â”‚   â”œâ”€â”€ whatsapp_guard.py     # Answer, decline or auto-reply to INCOMING WhatsApp calls
â”‚   â”œâ”€â”€ telegram_remote.py    # Drive JARVIS from anywhere over Telegram
â”‚   â”œâ”€â”€ chat_takeover.py      # Reads an on-screen chat and replies in it
â”‚   â”œâ”€â”€ screen_agent.py       # Looks at the screen and works it, step by step
â”‚   â”œâ”€â”€ gmail_control.py      # Read, search, send and draft email
â”‚   â”œâ”€â”€ calendar_control.py   # Read and create calendar events
â”‚   â”œâ”€â”€ obsidian_vault.py     # Read and write notes in an Obsidian vault
â”‚   â”œâ”€â”€ document_review.py    # Review a document and report what should change
â”‚   â”œâ”€â”€ excel_writer.py       # Spreadsheet output
â”‚   â”œâ”€â”€ code_helper.py        # Write and run small programs
â”‚   â”œâ”€â”€ dev_agent.py          # Multi-file project work
â”‚   â”œâ”€â”€ image_generator.py    # Generate images
â”‚   â”œâ”€â”€ upload_video.py       # Upload the video on your Desktop to YouTube
â”‚   â”œâ”€â”€ youtube_video.py      # Search, summarise and fetch transcripts
â”‚   â”œâ”€â”€ printer_control.py    # 3D printers, over MQTT
â”‚   â”œâ”€â”€ home_assistant.py     # Smart-home devices
â”‚   â”œâ”€â”€ game_updater.py       # Update or install games through their launcher
â”‚   â”œâ”€â”€ flight_finder.py      # Flight search
â”‚   â”œâ”€â”€ shopping_list.py      # Shopping list
â”‚   â”œâ”€â”€ pomodoro.py           # Pomodoro timer
â”‚   â”œâ”€â”€ water_reminder.py     # Hydration reminders with intake tracking
â”‚   â”œâ”€â”€ quiz.py               # Spoken quizzes
â”‚   â”œâ”€â”€ spaced_repetition.py  # Flashcard review
â”‚   â”œâ”€â”€ calorie_counter.py    # Food through the webcam
â”‚   â””â”€â”€ pushup_counter.py     # Counts pushups through the webcam
â”œâ”€â”€ actions/                  # Bundled skills â€” each self-describes via a TOOL dict + handler
â”‚                             #   Everything here drives the COMPUTER, which is what decides
â”‚                             #   whether a new skill belongs in this folder at all.
â”‚   â”œâ”€â”€ web_search.py         # Gemini + DDG parallel search (news, research, price, compare)
â”‚   â”œâ”€â”€ screen_processor.py   # Screen & webcam capture for vision
â”‚   â”œâ”€â”€ background_monitor.py # User-configured topic watching â€” daily DDG check
â”‚   â”œâ”€â”€ proactive.py          # Proactive 2.0 â€” time/context/rotation-aware check-ins
â”‚   â”œâ”€â”€ reminder.py           # OS-native scheduled notifications
â”‚   â”œâ”€â”€ system_monitor.py     # CPU / RAM / GPU / temperature telemetry
â”‚   â”œâ”€â”€ computer_settings.py  # Volume, brightness, WiFi, power (per-OS)
â”‚   â”œâ”€â”€ computer_control.py   # Keyboard shortcuts, mouse, window management
â”‚   â”œâ”€â”€ open_app.py           # Application launcher (per-OS name map)
â”‚   â”œâ”€â”€ browser_control.py    # Web browser control
â”‚   â”œâ”€â”€ file_controller.py    # File system operations
â”‚   â”œâ”€â”€ file_processor.py     # Document reading and summarization
â”‚   â”œâ”€â”€ send_message.py       # Messaging integration
â”‚   â”œâ”€â”€ weather_report.py     # Live city weather data
â”‚   â”œâ”€â”€ video_player.py       # Plays video on the HUD, where the avatar normally is
â”‚   â””â”€â”€ desktop.py            # Desktop and taskbar control
â”œâ”€â”€ memory/
â”‚   â”œâ”€â”€ memory_manager.py     # Load/save long_term.json â€” sessions, monitors, identity
â”‚   â”œâ”€â”€ config_manager.py     # api_keys.json access â€” key, OS, name, voice, colour, toggles
â”‚   â””â”€â”€ long_term.json        # Persistent store â€” created on first run
â”œâ”€â”€ dashboard/                # Phone control â€” paired by QR code, one-time key
â”‚   â”œâ”€â”€ server.py             # FastAPI + uvicorn; HTTP by default, HTTPS opt-in
â”‚   â””â”€â”€ static/               # The phone page and its login screen
â”œâ”€â”€ core/
â”‚   â”œâ”€â”€ outcome.py            # What a tool tells the model: done / unverified / failed /
â”‚   â”‚                         #   ask / started, plus the untrusted-content wrapper
â”‚   â”œâ”€â”€ appidentity.py        # Which applications are running, which one the user named,
â”‚   â”‚                         #   and which processes are the assistant's own (never a target)
â”‚   â”œâ”€â”€ lazyimport.py         # Heavy third-party imports paid only if they are used
â”‚   â”œâ”€â”€ platform_support.py   # What THIS machine permits â€” Wayland, macOS permissions â€”
â”‚   â”‚                         #   reported to the user and to the model, never guessed at
â”‚   â”œâ”€â”€ gemini.py             # One place for every one-shot Gemini call â€” model ladder, timeouts,
â”‚   â”‚                         #   cooldowns, and the configured provider as one more rung
â”‚   â”œâ”€â”€ prompt.txt            # All prompt wording â€” {tokens} are filled from the live system at startup
â”‚   â”œâ”€â”€ avatar.py             # Avatar renderer â€” lighting, pose, expression, mouth (QPainter)
â”‚   â”œâ”€â”€ avatar_mesh.py        # Head geometry â€” loads the face, generates skull/neck/risers
â”‚   â”œâ”€â”€ face_model.obj        # The face itself (MediaPipe canonical model, Apache-2.0, 25 KB)
â”‚   â”œâ”€â”€ viseme.py             # Transcript â†’ mouth shapes, fused with the audio's timing
â”‚   â”œâ”€â”€ echo.py               # Tells your voice from the assistant's own echo; self-calibrating
â”‚   â”œâ”€â”€ hotkey.py             # Push-to-talk chord â€” global on Windows, windowed fallback elsewhere
â”‚   â”œâ”€â”€ undo.py               # One shared undo stack â€” actions register how to reverse themselves
â”‚   â”œâ”€â”€ confirm.py            # Irreversible-action gate â€” the token is issued by the UI, not the model
â”‚   â”œâ”€â”€ audio_devices.py      # Microphone / speaker list â€” filtered, measured, resolved by name
â”‚   â”œâ”€â”€ plugin_loader.py      # Plugin engine â€” discovery, validation, crash isolation
â”‚   â”œâ”€â”€ action_loader.py      # Bundled-action engine â€” the built-in twin of plugin_loader
â”‚   â””â”€â”€ wake_word.py          # Local "Hey Jarvis" detector â€” own thread, offline, opt-in
â””â”€â”€ config/
    â”œâ”€â”€ api_keys.json         # API key, name, voice, colour, toggles â€” created on first launch (git-ignored)
    â””â”€â”€ certs/                # Self-signed TLS pair for the phone dashboard â€” generated locally (git-ignored)
```

---

## ğŸ™ Third-Party Assets

| Asset | Source | Licence |
|---|---|---|
| `core/face_model.obj` | [MediaPipe](https://github.com/google-ai-edge/mediapipe) canonical face model â€” 468 vertices of measured human face geometry | Apache License 2.0 |
| Aviation weather reports | [AviationWeather.gov](https://aviationweather.gov/) public data API | Public data; no API key or account required |

---

## ğŸ”’ Your Data

Most data stays on your machine. There is no MARK server, no telemetry and no account. When the Aviation Weather plugin is used, the requested ICAO station codes are sent to AviationWeather.gov to retrieve the public reports; no credentials or API key are included.

| What | Where | Notes |
|---|---|---|
| Gemini API key, plugin and provider credentials | `config/api_keys.json` | **Plaintext.** Anyone with your user account can read it. Treat it like a password file. |
| Dashboard TLS certificate + private key | `config/certs/` | Generated locally, self-signed, never leaves the machine. |
| What the assistant remembers about you | `memory/long_term.json` | Delete the file to make it forget everything. |
| Requested aviation station codes | AviationWeather.gov | Sent only when the Aviation Weather plugin is used. No API key or account is required. |

All three local files are listed in `.gitignore`, so a fork or a pull request cannot leak them by accident. **If you have already committed `config/api_keys.json` anywhere public, revoke that key** at [aistudio.google.com](https://aistudio.google.com/app/apikey) and generate a new one â€” removing the file in a later commit does not remove it from the history.

Your voice is streamed to Google's Gemini Live API while a session is open; that is one of the few things that leaves your computer, and it stops when you mute or close the app. The Aviation Weather plugin makes a separate public-data request to AviationWeather.gov when you ask for METAR or TAF information.

**Mark LVI changes what that sentence can say about you.** Choose a local engine â€” Whisper on your CPU, a model served by Ollama or LM Studio, your system's own voice â€” and nothing leaves the machine at all: no audio, no transcript, no key, no account. Choose a hosted provider instead and your audio and text go to that vendor rather than to Google. The panel says which is which, and the assistant never quietly switches between them.

---

## âš ï¸ License

Personal and non-commercial use only.
Licensed under **[Creative Commons BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)**.

---

## ğŸ‘¤ Connect with the Creator

Engineered by a developer building a real-world JARVIS-style assistant.
â­ **Star the repository to support the journey to Mark 100.**

| Platform | Link |
|---|---|
| YouTube | [@FatihMakes](https://www.youtube.com/@FatihMakes) |
| Instagram | [@fatihmakes](https://www.instagram.com/fatihmakes) |
