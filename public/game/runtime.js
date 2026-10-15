
        const $ = (selector) => document.querySelector(selector);
        const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

        const el = {
            app: $("#app"),
            loadingScreen: $("#loading-screen"),
            loadingBarFill: $("#loading-bar-fill"),
            loadingCount: $("#loading-count"),
            loadingPercent: $("#loading-percent"),
            loadingHint: $("#loading-hint"),
            topHud: $("#top-hud"),
            bgLayer: $("#bg-layer"),
            bgAurora: $("#bg-aurora"),
            stageName: $("#stage-name"),
            hpFill: $("#hp-fill"),
            hpText: $("#hp-text"),
            enemyFill: $("#enemy-fill"),
            enemyText: $("#enemy-text"),
            qiFill: $("#qi-fill"),
            qiText: $("#qi-text"),
            timerFill: $("#timer-fill"),
            timerText: $("#timer-text"),
            metricAcc: $("#metric-acc"),
            metricMaxCombo: $("#metric-max-combo"),
            metricScoreLabel: $("#metric-score-label"),
            metricDefeated: $("#metric-defeated"),
            metricTyped: $("#metric-typed"),
            arena: $("#arena"),
            arenaLight: $("#arena-light"),
            arenaAmbient: $("#arena-ambient"),
            feedbackFlash: $("#feedback-flash"),
            heroWrap: $("#hero-wrap"),
            enemyWrap: $("#enemy-wrap"),
            heroSprite: $("#hero-sprite"),
            enemySprite: $("#enemy-sprite"),
            projectileLayer: $("#projectile-layer"),
            effectLayer: $("#effect-layer"),
            promptBoard: $("#prompt-board"),
            promptStage: $("#prompt-stage"),
            promptMain: $("#prompt-main"),
            promptSub: $("#prompt-sub"),
            wordProgress: $("#word-progress"),
            coachStrip: $("#coach-strip"),
            imePanel: $("#ime-panel"),
            imeTitle: $("#ime-title"),
            imeHint: $("#ime-hint"),
            imeInput: $("#ime-input"),
            stage2QtePanel: $("#stage2-qte-panel"),
            stage2QteLabel: $("#stage2-qte-label"),
            stage2QteKey: $("#stage2-qte-key"),
            stage2QteCountdown: $("#stage2-qte-countdown"),
            stage2QteFill: $("#stage2-qte-fill"),
            bossQtePanel: $("#boss-qte-panel"),
            bossQteKey: $("#boss-qte-key"),
            bossQteCountdown: $("#boss-qte-countdown"),
            bossQteFill: $("#boss-qte-fill"),
            counterWindowPanel: $("#counter-window-panel"),
            counterWindowTime: $("#counter-window-time"),
            counterWindowFill: $("#counter-window-fill"),
            comboFloat: $("#combo-float"),
            stageClearFx: $("#stage-clear-fx"),
            hitLine: $("#hit-line"),
            objectiveMain: $("#objective-main"),
            objectiveGuide: $("#objective-guide"),
            objectiveProgress: $("#objective-progress"),
            stageTrack: $("#stage-track"),
            monsterRail: $("#monster-rail"),
            bossDistanceWrap: $("#boss-distance-wrap"),
            bossDistanceFill: $("#boss-distance-fill"),
            dialoguePanel: $("#dialogue-panel"),
            dialogueSpeaker: $("#dialogue-speaker"),
            dialogueText: $("#dialogue-text"),
            dialogueNext: $("#dialogue-next"),
            victorySkipTip: $("#victory-skip-tip"),
            titleScreen: $("#title-screen"),
            btnStart: $("#btn-start"),
            btnStage5: $("#btn-stage5"),
            btnOpenLeaderboard: $("#btn-open-leaderboard"),
            btnZhMode: $("#btn-zh-mode"),
            btnZhBpmfMode: $("#btn-zh-bpmf-mode"),
            btnTitleSettings: $("#btn-title-settings"),
            titleMore: $("#title-more"),
            cloudPlayerName: $("#cloud-player-name"),
            cloudSheetUrl: $("#cloud-sheet-url"),
            btnCloudSave: $("#btn-cloud-save"),
            btnCloudRefresh: $("#btn-cloud-refresh"),
            cloudSettingsStatus: $("#cloud-settings-status"),
            titleLeaderboardStatus: $("#title-leaderboard-status"),
            titleLeaderboardGrid: $("#title-leaderboard-grid"),
            leaderboardScreen: $("#leaderboard-screen"),
            btnLeaderboardRefresh: $("#btn-leaderboard-refresh"),
            btnLeaderboardBack: $("#btn-leaderboard-back"),
            stageSelectScreen: $("#stage-select-screen"),
            stageSelectModeBar: $("#stage-select-modebar"),
            btnModeEn: $("#btn-mode-en"),
            btnModeZhHanzi: $("#btn-mode-zh-hanzi"),
            btnModeZhBpmf: $("#btn-mode-zh-bpmf"),
            stageSelectSummary: $("#stage-select-summary"),
            stageSelectGrid: $("#stage-select-grid"),
            btnSelectBack: $("#btn-select-back"),
            btnAssist: $("#btn-assist"),
            btnContrast: $("#btn-contrast"),
            btnMotion: $("#btn-motion"),
            btnPause: $("#btn-pause"),
            pauseScreen: $("#pause-screen"),
            btnResume: $("#btn-resume"),
            btnPauseToTitle: $("#btn-pause-to-title"),
            resultScreen: $("#result-screen"),
            resultTitle: $("#result-title"),
            resultSub: $("#result-sub"),
            resultStageLine: $("#result-stage-line"),
            resultStars: $("#result-stars"),
            resultScoreLine: $("#result-score-line"),
            resultScore: $("#result-score"),
            resultAcc: $("#result-acc"),
            resultMaxCombo: $("#result-max-combo"),
            resultTyped: $("#result-typed"),
            certificate: $("#certificate"),
            btnUploadScore: $("#btn-upload-score"),
            btnCloudRefreshResult: $("#btn-cloud-refresh-result"),
            cloudUploadStatus: $("#cloud-upload-status"),
            cloudUploadRankboard: $("#cloud-upload-rankboard"),
            btnReplay: $("#btn-replay"),
            btnPractice: $("#btn-practice"),
            btnRestart: $("#btn-restart"),
            learningReportText: $("#learning-report-text"),
            achievementList: $("#achievement-list"),
            growthPanelText: $("#growth-panel-text"),
            failScreen: $("#fail-screen"),
            failReason: $("#fail-reason"),
            btnRetryStage: $("#btn-retry-stage"),
            btnFailRestart: $("#btn-fail-restart"),
            learningLive: $("#learning-live"),
            learningTip: $("#learning-tip"),
            toast: $("#toast")
        };

        const SCENES = {
            title: "/original/art/title_background_inkwash.svg",
            forest: "/original/art/backgrounds-battle_forest_pixel.svg",
            frozen: "/original/art/backgrounds-battle_frozen_peak_pixel.svg",
            cave: "/original/art/backgrounds-battle_cave_pixel.svg",
            crypt: "/original/art/backgrounds-battle_crypt_pixel.svg",
            ruins: "/original/art/backgrounds-battle_ruins_pixel.svg",
            volcano: "/original/art/backgrounds-battle_volcano_pixel.svg"
        };

        const SCENE_TONES = {
            title: { sat: 1.05, bright: 0.9, aura: 0.82 },
            forest: { sat: 1.1, bright: 0.95, aura: 1 },
            frozen: { sat: 1.12, bright: 1, aura: 0.95 },
            cave: { sat: 0.95, bright: 0.86, aura: 0.82 },
            crypt: { sat: 0.95, bright: 0.85, aura: 0.8 },
            ruins: { sat: 1.12, bright: 0.94, aura: 0.9 },
            volcano: { sat: 1.2, bright: 0.98, aura: 1.06 }
        };

        const MONSTERS = {
            ruins_guardian_boss: { name: "Vua hộ vệ di tích", src: "/original/art/monsters-ruins_guardian_boss.svg" },
            boar_angry: { name: "Lợn rừng cuồng nộ", src: "/original/art/monsters-boar_angry.svg" },
            ice_spirit_elite: { name: "Hàn linh tinh anh", src: "/original/art/monsters-ice_spirit_elite.svg" },
            mountain_bandit: { name: "Sơn tặc", src: "/original/art/monsters-mountain_bandit.svg" },
            corrupted_treant: { name: "Thụ linh tha hóa", src: "/original/art/monsters-corrupted_treant.svg" },
            mountain_bandit_elite: { name: "Thủ lĩnh sơn tặc", src: "/original/art/monsters-mountain_bandit_elite.svg" },
            stone_golem_elite: { name: "Thạch khôi tinh anh", src: "/original/art/monsters-stone_golem_elite.svg" },
            wolf_cub_elite: { name: "Sói con tinh anh", src: "/original/art/monsters-wolf_cub_elite.svg" },
            undead_warrior: { name: "Võ giả bất tử", src: "/original/art/monsters-undead_warrior.svg" },
            boar_angry_elite: { name: "Vua lợn rừng cuồng nộ", src: "/original/art/monsters-boar_angry_elite.svg" },
            crazed_scholar_elite: { name: "Cuồng thư sinh tinh anh", src: "/original/art/monsters-crazed_scholar_elite.svg" },
            forest_spirit: { name: "Tinh phách rừng", src: "/original/art/monsters-forest_spirit.svg" },
            stone_golem: { name: "Thạch khôi", src: "/original/art/monsters-stone_golem.svg" },
            snakelet_bamboo: { name: "Rắn trúc non", src: "/original/art/monsters-snakelet_bamboo.svg" },
            corrupted_treant_elite: { name: "Cổ thụ tha hóa", src: "/original/art/monsters-corrupted_treant_elite.svg" },
            nether_lord_boss: { name: "Ma vương một ngón", src: "/original/art/monsters-nether_lord_boss.svg" },
            crazed_scholar: { name: "Cuồng thư sinh", src: "/original/art/monsters-crazed_scholar.svg" },
            shadow_imp: { name: "Ảnh mị", src: "/original/art/monsters-shadow_imp.svg" },
            forest_spirit_elite: { name: "Linh hộ vệ rừng", src: "/original/art/monsters-forest_spirit_elite.svg" },
            forest_guardian_boss: { name: "Vua hộ vệ rừng", src: "/original/art/monsters-forest_guardian_boss.svg" },
            flying_eye_elite: { name: "Tà nhãn tinh anh", src: "/original/art/monsters-flying_eye_elite.svg" },
            frost_wyrm_boss: { name: "Sương long vương", src: "/original/art/monsters-frost_wyrm_boss.svg" },
            flying_eye: { name: "Phi nhãn", src: "/original/art/monsters-flying_eye.svg" },
            lich_apprentice_elite: { name: "Học đồ vu yêu tinh anh", src: "/original/art/monsters-lich_apprentice_elite.svg" },
            cave_troll_boss: { name: "Cự ma hang động", src: "/original/art/monsters-cave_troll_boss.svg" },
            wolf_cub: { name: "Sói con", src: "/original/art/monsters-wolf_cub.svg" },
            yeti: { name: "Tuyết quái", src: "/original/art/monsters-yeti.svg" },
            placeholder_monster: { name: "Ảo ảnh thử thách", src: "/original/art/monsters-placeholder_monster.svg" },
            lava_elemental_boss: { name: "Vua nguyên tố dung nham", src: "/original/art/monsters-lava_elemental_boss.svg" },
            lich_apprentice: { name: "Học đồ vu yêu", src: "/original/art/monsters-lich_apprentice.svg" },
            shadow_imp_elite: { name: "Ảnh mị tinh anh", src: "/original/art/monsters-shadow_imp_elite.svg" },
            ice_spirit: { name: "Hàn linh", src: "/original/art/monsters-ice_spirit.svg" }
        };

        const HERO_FRAMES = {"stand":["/original/art/character-stand-1.svg","/original/art/character-stand-2.svg","/original/art/character-stand-3.svg","/original/art/character-stand-4.svg"],"run":["/original/art/character-run-1.svg","/original/art/character-run-2.svg","/original/art/character-run-3.svg","/original/art/character-run-4.svg"],"jump":["/original/art/character-jump-1.svg","/original/art/character-jump-2.svg","/original/art/character-jump-3.svg","/original/art/character-jump-4.svg"],"attack":["/original/art/character-attack-1.svg","/original/art/character-attack-2.svg","/original/art/character-attack-3.svg","/original/art/character-attack-4.svg"],"defense":["/original/art/character-defense-1.svg","/original/art/character-defense-2.svg","/original/art/character-defense-3.svg","/original/art/character-defense-4.svg"],"Injuried":["/original/art/character-Injuried-1.svg","/original/art/character-Injuried-2.svg","/original/art/character-Injuried-3.svg","/original/art/character-Injuried-4.svg"]};

        const HERO_FRAME_INTERVAL = {
            stand: 230,
            run: 72,
            jump: 82,
            attack: 78,
            defense: 84,
            Injuried: 95
        };

        const STAGE_TRACK = [
            { name: "Tấn pháp căn bản", thumb: "/original/art/ui-location_thumb_forest.svg" },
            { name: "Khinh công vượt mây", thumb: "/original/art/ui-location_thumb_frozen_peak.svg" },
            { name: "Quét chân phá ám khí", thumb: "/original/art/ui-location_thumb_crypt.svg" },
            { name: "Kiếm khí tung hoành", thumb: "/original/art/ui-location_thumb_ruins.svg" },
            { name: "Quyết chiến ma giáo", thumb: "/original/art/ui-location_thumb_volcano.svg" }
        ];

        const STAGE_VISUALS = {
            1: { glow: "rgba(147, 243, 195, 0.34)", spark: "rgba(172, 248, 214, 0.9)", shadow: "rgba(65, 158, 116, 0.55)", heat: "rgba(255, 210, 149, 0.14)" },
            2: { glow: "rgba(151, 216, 255, 0.34)", spark: "rgba(187, 232, 255, 0.88)", shadow: "rgba(81, 140, 185, 0.62)", heat: "rgba(192, 237, 255, 0.18)" },
            3: { glow: "rgba(127, 199, 236, 0.28)", spark: "rgba(166, 225, 255, 0.85)", shadow: "rgba(71, 108, 145, 0.58)", heat: "rgba(255, 192, 155, 0.11)" },
            4: { glow: "rgba(255, 216, 152, 0.3)", spark: "rgba(255, 229, 175, 0.89)", shadow: "rgba(166, 113, 64, 0.62)", heat: "rgba(255, 226, 145, 0.17)" },
            5: { glow: "rgba(255, 138, 105, 0.35)", spark: "rgba(255, 184, 156, 0.9)", shadow: "rgba(173, 65, 43, 0.64)", heat: "rgba(255, 126, 90, 0.24)" }
        };

        const STAGE_CHALLENGE_SECONDS = 180;

        const STAGE_SCORE_TIERS = {
            1: [7000, 11000, 15500],
            2: [7600, 12000, 16800],
            3: [8200, 12800, 18000],
            4: [9200, 14000, 19800],
            5: [10800, 16200, 23000]
        };

        const STAGES = [
            {
                id: 1,
                name: "Ải 1 · Tấn pháp căn bản",
                subtitle: "A S D F J K L ; Tích khí chém phù văn",
                scene: "forest",
                bgm: "main",
                mechanic: "homefall",
                enemyHp: 18,
                objectiveText: "Gõ trúng phù văn để tích khí,3 nấc sẽ tự động xuất kiếm.",
                target: 6,
                enemyPool: [
                    "snakelet_bamboo",
                    "wolf_cub",
                    "boar_angry",
                    "forest_spirit",
                    "shadow_imp",
                    "flying_eye",
                    "wolf_cub_elite",
                    "boar_angry_elite"
                ],
                opening: [
                    { speaker: "[Hướng dẫn]", text: "Bấm trúng phù văn để tích khí. Chỉ cần nhớ:3 nấc sẽ tự động chém." },
                    { speaker: "Sư phụ", text: "Nhìn đối thủ, đừng nhìn bàn phím. Bấm đều tay nhé." }
                ],
                clear: [
                    { speaker: "[Hướng dẫn]", text: "Tụ khí trảm đã thành thạo! Khả năng nhớ vị trí phím tăng +100, Đã đạt cảnh giới Trúc cơ." }
                ]
            },
            {
                id: 2,
                name: "Ải 2 · Khinh công vượt mây",
                subtitle: "Q~P Đạp mây tích khí / FJ Đỡ đòn kích nổ mây",
                scene: "frozen",
                bgm: "main",
                mechanic: "top_anchor",
                enemyHp: 10,
                objectiveText: "Q~P Tích đủ 2 nấc vân khí, rồi bấm F/J đỡ đòn để kích nổ mây.",
                target: 5,
                enemyPool: [
                    "mountain_bandit",
                    "mountain_bandit_elite",
                    "flying_eye",
                    "flying_eye_elite",
                    "ice_spirit",
                    "ice_spirit_elite",
                    "yeti"
                ],
                opening: [
                    { speaker: "Sư phụ", text: "Nhảy để tích vân khí, rồi bấm F/J theo yêu cầu để thủ và kích nổ. Cứ theo nhịp nhé." }
                ],
                clear: [
                    { speaker: "[Hướng dẫn]", text: "Đã điều khiển được vân khí! Mở thành tựu Dạo bước tầng mây." }
                ]
            },
            {
                id: 3,
                name: "Ải 3 · Quét chân phá ám khí",
                subtitle: "Z~M Tích khiên để phản kích",
                scene: "cave",
                bgm: "battle",
                mechanic: "bottom_defense",
                enemyHp: 12,
                objectiveText: "Z~M để đỡ ám khí. Đầy 3 nấc sẽ tự phản kích.",
                target: 4,
                enemyPool: [
                    "stone_golem",
                    "stone_golem_elite",
                    "crazed_scholar",
                    "crazed_scholar_elite",
                    "lich_apprentice",
                    "lich_apprentice_elite",
                    "shadow_imp_elite"
                ],
                opening: [
                    { speaker: "Sư phụ", text: "Ải này cần đỡ đòn rồi phản kích. Nhìn kỹ, bấm đúng và giữ nhịp." }
                ],
                clear: [
                    { speaker: "[Hướng dẫn]", text: "Đã luyện thành khiên phản kích! Bạn đã sẵn sàng xuống núi." }
                ]
            },
            {
                id: 4,
                name: "Ải 4 · Kiếm khí tung hoành",
                subtitle: "Easy Words Liên chiêu phá bùa",
                scene: "ruins",
                bgm: "battle",
                mechanic: "word_combo",
                enemyHp: 8,
                objectiveText: "Gõ đủ từ được yêu cầu để phá bùa của quái vật.",
                target: 8,
                enemyPool: [
                    "corrupted_treant",
                    "corrupted_treant_elite",
                    "undead_warrior",
                    "forest_spirit_elite",
                    "shadow_imp_elite",
                    "cave_troll_boss"
                ],
                opening: [
                    { speaker: "[Hướng dẫn]", text: "Gõ hết cả từ mới gây sát thương." },
                    { speaker: "Sư phụ", text: "Nhìn cả từ trước khi gõ. Đừng vội bấm từng phím." }
                ],
                clear: [
                    { speaker: "Sư phụ (hài lòng)", text: "Con đã nắm được cách nối chiêu. Phần còn lại, hãy tự mình vượt qua!" }
                ]
            },
            {
                id: 5,
                name: "Ải 5 · Quyết chiến ma giáo",
                subtitle: "Ma vương đấu từ vựng + ĐỠ ĐÒN + Space",
                scene: "volcano",
                bgm: "battle",
                mechanic: "boss_raid",
                enemyHp: 360,
                objectiveText: "Gõ đủ từ để tấn công; khi thấy ĐỠ ĐÒN thì bấm F/J; Đầy nội lực, bấm Space.",
                target: 360,
                enemyPool: [
                    "nether_lord_boss",
                    "forest_guardian_boss",
                    "ruins_guardian_boss",
                    "frost_wyrm_boss",
                    "lava_elemental_boss"
                ],
                opening: [
                    { speaker: "Ma vương một ngón (ngạo mạn)", text: "Ha ha! Một đệ tử vô danh mà dám thách đấu ta? Xem tuyệt kỹ hai ngón của ta đây! Không ai nhìn bàn phím tìm chữ nhanh bằng ta!" },
                    { speaker: "Kiếm khách (tự tin)", text: "Nhìn bàn phím để gõ sao? Chiêu đó xưa rồi! Hôm nay, ta sẽ cho ngươi thấy tuyệt kỹ gõ không nhìn phím!" },
                    { speaker: "[Hướng dẫn]", text: "Bắt đầu thử thách cuối:Ma vương có ba giai đoạn, càng về sau càng nhanh. Chú ý đổi giữa công và thủ!" }
                ],
                clear: [
                    { speaker: "Lời dẫn", text: "Kiếm khách tra kiếm vào vỏ." },
                    { speaker: "[Hướng dẫn]", text: "Hoàn thành hành trình. Bạn đã đạt cảnh giới vô địch!" },
                    { speaker: "Sư phụ", text: "Từ hôm nay, con là Người giữ Đèn Sao!" }
                ]
            }
        ];

        const EN_BOSS_WORD_BANK = {
            easy: [
                "apple", "banana", "orange", "school", "friend", "family", "garden", "animal",
                "teacher", "student", "pencil", "window", "morning", "weather", "summer", "winter",
                "science", "nature", "planet", "memory", "energy", "travel", "bridge", "village",
                "market", "museum", "forest", "river", "castle", "button", "screen", "shadow",
                "safety", "health", "future", "signal", "rocket", "ticket", "puzzle", "lesson"
            ],
            middle: [
                "adventure", "favorite", "beautiful", "language", "computer", "exercise", "discover", "festival",
                "practice", "history", "message", "project", "subject", "library", "culture", "mountain",
                "question", "answer", "example", "problem", "carefully", "powerful", "perfectly", "remember",
                "backpack", "calendar", "classroom", "teamwork", "creative", "strategy", "sunlight", "midnight",
                "building", "shopping", "internet", "painting", "engineer", "athletic", "wildlife", "treasure"
            ],
            junior: [
                "environment", "technology", "important", "different", "experience", "community", "knowledge", "communication",
                "condition", "relationship", "opportunity", "traditional", "improvement", "education", "direction", "successful",
                "confidence", "challenge", "responsible", "available", "solution", "research", "development", "situation",
                "chemical", "historical", "geography", "equation", "analysis", "grammar", "organism", "reaction",
                "microscope", "electricity", "ecosystem", "literature", "experiment", "population", "percentage", "volunteer"
            ],
            senior: [
                "extraordinary", "interpretation", "characteristic", "concentration", "representation", "investigation",
                "appreciation", "consideration", "achievement", "independent", "collaboration", "fundamental",
                "architecture", "biodiversity", "transformation", "transportation", "civilization", "mathematical",
                "psychological", "international", "controversial", "significance", "philosophical", "underestimate",
                "electromagnetic", "photosynthesis", "constitutional", "interdisciplinary", "sustainability", "entrepreneurship",
                "experimentalist", "microorganism", "thermodynamics", "interpretative", "computational", "manufacturing",
                "biochemical", "probability", "sociological", "neurological"
            ]
        };

        const ZH_TYPING_WORD_BANK = {easy:[],middle:[],hard:[]};

        const BOPOMOFO_KEYMAP = {
            "ㄅ": "1", "ㄆ": "q", "ㄇ": "a", "ㄈ": "z",
            "ㄉ": "2", "ㄊ": "w", "ㄋ": "s", "ㄌ": "x",
            "ㄍ": "e", "ㄎ": "d", "ㄏ": "c",
            "ㄐ": "r", "ㄑ": "f", "ㄒ": "v",
            "ㄓ": "5", "ㄔ": "t", "ㄕ": "g", "ㄖ": "b",
            "ㄗ": "y", "ㄘ": "h", "ㄙ": "n",
            "ㄧ": "u", "ㄨ": "j", "ㄩ": "m",
            "ㄚ": "8", "ㄛ": "i", "ㄜ": "k", "ㄝ": ",",
            "ㄞ": "9", "ㄟ": "o", "ㄠ": "l", "ㄡ": ".",
            "ㄢ": "0", "ㄣ": "p", "ㄤ": ";", "ㄥ": "/", "ㄦ": "-",
            "ˇ": "3", "ˋ": "4", "ˊ": "6", "˙": "7"
        };
        const BOPOMOFO_LABEL_BY_KEY = Object.fromEntries(Object.entries(BOPOMOFO_KEYMAP).map(([symbol, key]) => [key, symbol]));

        function buildBopomofoModeTokens() {
            const all = [
                ...ZH_TYPING_WORD_BANK.easy,
                ...ZH_TYPING_WORD_BANK.middle,
                ...ZH_TYPING_WORD_BANK.hard
            ];
            return all.map((item) => {
                const raw = String(item.phonetic || "").replace(/[\s\u3000]/g, "");
                const keys = Array.from(raw).map((symbol) => BOPOMOFO_KEYMAP[symbol] || "").join("");
                return {
                    text: raw,
                    phonetic: item.text,
                    hanzi: item.text,
                    input: keys
                };
            }).filter((token) => token.text && token.input && token.text.length === token.input.length);
        }

        const audio = {
            unlocked: false,
            bgm: {
                title: new Audio("/original/audio/lantern-courtyard.mp3"),
                main: new Audio("/original/audio/jade-postroad.mp3"),
                battle: new Audio("/original/audio/inkstorm-duel.mp3")
            },
            sfx: {
                heal: "/original/audio/cue-heal_effect.mp3",
                debuff: "/original/audio/cue-debuff_negative.mp3",
                shield: "/original/audio/cue-shield_block.mp3",
                skill: "/original/audio/cue-skill_cast.mp3",
                buy: "/original/audio/cue-buy_item.mp3",
                crit: "/original/audio/cue-attack_crit.mp3",
                correct: "/original/audio/cue-answer_correct.mp3",
                poison: "/original/audio/cue-poison_tick.mp3",
                fire: "/original/audio/cue-fire_effect.mp3",
                buff: "/original/audio/cue-buff_positive.mp3",
                hover: "/original/audio/cue-button_hover.mp3",
                ice: "/original/audio/cue-ice_effect.mp3",
                playerAttack: "/original/audio/cue-player_attack.mp3",
                monsterAttack: "/original/audio/cue-monster_attack.mp3",
                levelUp: "/original/audio/cue-level_up.mp3",
                lose: "/original/audio/cue-battle_lose.mp3",
                wrong: "/original/audio/cue-answer_wrong.mp3",
                click: "/original/audio/cue-button_click.mp3"
            },
            currentBgm: null
        };

        Object.values(audio.bgm).forEach((track) => {
            track.loop = true;
            track.volume = 0.42;
            track.preload = "auto";
        });

        const game = {
            mode: "title",
            stageIndex: 0,
            currentStageDef: null,
            playerHp: 140,
            maxPlayerHp: 140,
            enemyHp: 0,
            maxEnemyHp: 0,
            combo: 0,
            maxCombo: 0,
            qi: 0,
            maxQi: 100,
            defeated: 0,
            totalTyped: 0,
            correctTyped: 0,
            sessionStart: 0,
            stageStart: 0,
            stageData: null,
            stageTimerTotal: STAGE_CHALLENGE_SECONDS,
            stageTimerLeft: STAGE_CHALLENGE_SECONDS,
            stageTimerEndAt: 0,
            timedStageFinished: false,
            stageScore: 0,
            stageCycles: 0,
            errorStreak: 0,
            cycleResetLockUntil: 0,
            heroState: "stand",
            heroFrame: 0,
            heroFrameClock: 0,
            heroStateLockUntil: 0,
            lastTick: performance.now(),
            dialogueQueue: [],
            dialogueOnDone: null,
            currentMonster: null,
            toastTimer: null,
            feedbackTimer: null,
            arenaShakeTimer: null,
            hitLineTimer: null,
            coachTimer: null,
            previewTimer: null,
            ambientTimer: 0,
            fxPool: {},
            autoPausedByBlur: false,
            pauseStartedAt: 0,
            victoryCinematic: {
                active: false,
                timers: []
            },
            sessionAttempts: [],
            stageMisses: 0,
            stagePerfect: true,
            practiceMode: false,
            practicePlan: null,
            lastResultInsights: null,
            titleOptionsOpen: false,
            bossChallengeMode: false,
            endlessBossMode: false,
            chineseMode: false,
            inputLocale: "en",
            imeComposing: false,
            imeDraftText: "",
            zhModeVariant: "hanzi",
            independentStageMode: true,
            selectedStageIndex: 0,
            currentWordStart: 0,
            adaptive: {
                level: 1,
                spawnScale: 1,
                bossDrainScale: 1,
                wordDamageScale: 1
            },
            profile: {
                assistMode: true,
                highContrast: false,
                reducedMotion: false,
                playerName: "",
                sheetWebhookUrl: "",
                sessions: 0,
                totalKeys: 0,
                bestAcc: 0,
                bestCombo: 0,
                stageRecords: {},
                specialRecords: {},
                achievements: []
            },
            analytics: {
                keyStats: {},
                wordStats: {}
            },
            unlockedAchievements: new Set(),
            imeLastHandledValue: "",
            imeLastHandledAt: 0,
            enemyAmbientFxTimer: 1.4,
            cloud: {
                leaderboard: {},
                top3ByStage: {},
                playerRanksByStage: {},
                loading: false,
                lastSyncAt: 0,
                lastError: "",
                statusText: "Chưa tải",
                pendingUpload: null,
                uploading: false,
                lastSubmitRank: null
            }
        };

        let PROFILE_STORAGE_KEY = "wuxia_vi_profile_v1";
        const DEFAULT_CLOUD_WEBHOOK_URL = "";

        function getStage() {
            return game.currentStageDef || STAGES[game.stageIndex];
        }

        function isTimedChallengeActive() {
            return !game.practiceMode && Number.isFinite(game.stageTimerEndAt) && game.stageTimerEndAt > 0;
        }

        function getTypingModeKey() {
            if (!game.chineseMode) return "en";
            return game.zhModeVariant === "bopomofo" ? "zh-bpmf" : "zh-hanzi";
        }

        function applyTypingMode(modeKey = "en") {
            if (modeKey === "zh-bpmf") {
                game.chineseMode = true;
                game.zhModeVariant = "bopomofo";
                game.inputLocale = "en";
                return;
            }
            if (modeKey === "zh-hanzi") {
                game.chineseMode = true;
                game.zhModeVariant = "hanzi";
                game.inputLocale = "zh";
                return;
            }
            game.chineseMode = false;
            game.zhModeVariant = "hanzi";
            game.inputLocale = "en";
        }

        function getTypingModeLabel(modeKey = getTypingModeKey()) {
            if (modeKey === "zh-hanzi") return "Chữ Hán";
            if (modeKey === "zh-bpmf") return "Chú âm";
            return "Gõ phím";
        }

        function getTypingModeLongLabel(modeKey = getTypingModeKey()) {
            if (modeKey === "zh-hanzi") return "Luyện nhập chữ Hán";
            if (modeKey === "zh-bpmf") return "Chú âm · vị trí phím";
            return "Gõ phím";
        }

        function refreshTypingModeButtons() {
            const modeKey = getTypingModeKey();
            if (el.btnModeEn) el.btnModeEn.classList.toggle("active", modeKey === "en");
            if (el.btnModeZhHanzi) el.btnModeZhHanzi.classList.toggle("active", modeKey === "zh-hanzi");
            if (el.btnModeZhBpmf) el.btnModeZhBpmf.classList.toggle("active", modeKey === "zh-bpmf");
        }

        function initStaticUI() {
            el.stageTrack.innerHTML = STAGE_TRACK.map((stage, index) => `
                <div class="stage-node" data-stage-node="${index}">
                    <img src="${stage.thumb}" alt="${stage.name}">
                    <div>${stage.name}</div>
                </div>
            `).join("");
        }

        function createDefaultStageRecord() {
            return {
                bestScore: 0,
                bestStars: 0,
                bestGrade: "D",
                clearCount: 0,
                bestAcc: 0,
                bestCombo: 0,
                bestTyped: 0
            };
        }

        function gradeToValue(grade) {
            if (grade === "S") return 5;
            if (grade === "A") return 4;
            if (grade === "B") return 3;
            if (grade === "C") return 2;
            return 1;
        }

        function pickBetterGrade(current, candidate) {
            return gradeToValue(candidate) > gradeToValue(current) ? candidate : current;
        }

        function renderStars(stars, max = 3) {
            let html = "";
            for (let i = 1; i <= max; i += 1) {
                html += `<span class="${i <= stars ? "on" : "off"}">★</span>`;
            }
            return html;
        }

        function buildJudgeScore(baseScore, acc, maxCombo, typed) {
            const accScore = Math.round(acc * 26);
            const comboScore = Math.round(maxCombo * 34);
            const typedScore = Math.round(Math.min(500, typed) * 8);
            const total = Math.max(0, Math.round(baseScore + accScore + comboScore + typedScore));
            return { total, accScore, comboScore, typedScore };
        }

        function evaluateSpecialModeResult(modeKey, finalScore, acc, maxCombo, typed, rounds = 0) {
            if (modeKey === "endlessBoss") {
                let stars = 0;
                if (rounds >= 15 || finalScore >= 42000) stars = 3;
                else if (rounds >= 8 || finalScore >= 22000) stars = 2;
                else if (rounds >= 3 || finalScore >= 10000) stars = 1;
                let grade = stars === 3 ? "A" : stars === 2 ? "B" : stars === 1 ? "C" : "D";
                if (stars >= 3 && acc >= 93 && maxCombo >= 28 && typed >= 220) grade = "S";
                else if (acc >= 90 && stars >= 2) grade = "A";
                return { stars, grade, pass: rounds >= 1, tiers: [10000, 22000, 42000] };
            }

            if (modeKey === "zhMode") {
                const tiers = [6500, 11000, 17000];
                let stars = 0;
                if (finalScore >= tiers[2]) stars = 3;
                else if (finalScore >= tiers[1]) stars = 2;
                else if (finalScore >= tiers[0]) stars = 1;
                let grade = stars === 3 ? "A" : stars === 2 ? "B" : stars === 1 ? "C" : "D";
                if (stars >= 3 && acc >= 95 && maxCombo >= 18) grade = "S";
                else if (acc >= 92 && stars >= 2) grade = "A";
                else if (acc >= 86 && stars >= 1) grade = "B";
                return { stars, grade, pass: stars >= 1, tiers };
            }

            return { stars: 0, grade: "D", pass: false, tiers: [0, 0, 0] };
        }

        function evaluateStageResult(stageId, finalScore, acc, maxCombo, typed) {
            const tiers = STAGE_SCORE_TIERS[stageId] || [7000, 11000, 15500];
            let stars = 0;
            if (finalScore >= tiers[2]) stars = 3;
            else if (finalScore >= tiers[1]) stars = 2;
            else if (finalScore >= tiers[0]) stars = 1;

            let grade = "D";
            if (stars === 3) grade = "A";
            else if (stars === 2) grade = "B";
            else if (stars === 1) grade = "C";
            if (acc >= 96 && maxCombo >= 26 && typed >= 180 && stars >= 3) grade = "S";
            else if (acc >= 92 && stars >= 2) grade = "A";
            else if (acc >= 86 && stars >= 1) grade = "B";

            return {
                tiers,
                stars,
                grade,
                pass: stars >= 1
            };
        }

        function ensureStageRecordsShape() {
            if (!game.profile.stageRecords || typeof game.profile.stageRecords !== "object") {
                game.profile.stageRecords = {};
            }
            STAGES.forEach((stage, idx) => {
                const key = String(idx + 1);
                const saved = game.profile.stageRecords[key] || {};
                game.profile.stageRecords[key] = {
                    bestScore: Number(saved.bestScore) || 0,
                    bestStars: clamp(Number(saved.bestStars) || 0, 0, 3),
                    bestGrade: typeof saved.bestGrade === "string" ? saved.bestGrade : "D",
                    clearCount: Number(saved.clearCount) || 0,
                    bestAcc: Number(saved.bestAcc) || 0,
                    bestCombo: Number(saved.bestCombo) || 0,
                    bestTyped: Number(saved.bestTyped) || 0
                };
            });
        }

        function createDefaultSpecialRecord() {
            return {
                bestScore: 0,
                bestStars: 0,
                bestGrade: "D",
                bestAcc: 0,
                bestCombo: 0,
                bestTyped: 0,
                bestRounds: 0,
                playCount: 0
            };
        }

        function ensureSpecialRecordsShape() {
            if (!game.profile.specialRecords || typeof game.profile.specialRecords !== "object") {
                game.profile.specialRecords = {};
            }
            ["endlessBoss", "zhMode"].forEach((key) => {
                const saved = game.profile.specialRecords[key] || {};
                game.profile.specialRecords[key] = {
                    bestScore: Number(saved.bestScore) || 0,
                    bestStars: clamp(Number(saved.bestStars) || 0, 0, 3),
                    bestGrade: typeof saved.bestGrade === "string" ? saved.bestGrade : "D",
                    bestAcc: Number(saved.bestAcc) || 0,
                    bestCombo: Number(saved.bestCombo) || 0,
                    bestTyped: Number(saved.bestTyped) || 0,
                    bestRounds: Number(saved.bestRounds) || 0,
                    playCount: Number(saved.playCount) || 0
                };
            });
        }

        function getSpecialRecord(modeKey) {
            ensureSpecialRecordsShape();
            if (!game.profile.specialRecords[modeKey]) {
                game.profile.specialRecords[modeKey] = createDefaultSpecialRecord();
            }
            return game.profile.specialRecords[modeKey];
        }

        function getStageRecord(stageId) {
            ensureStageRecordsShape();
            const key = String(stageId);
            if (!game.profile.stageRecords[key]) {
                game.profile.stageRecords[key] = createDefaultStageRecord();
            }
            return game.profile.stageRecords[key];
        }

        function renderStageSelect() {
            ensureStageRecordsShape();
            ensureSpecialRecordsShape();
            const totalStars = STAGES.reduce((sum, stage) => sum + (getStageRecord(stage.id).bestStars || 0), 0);
            const totalClears = STAGES.reduce((sum, stage) => sum + (getStageRecord(stage.id).clearCount || 0), 0);
            const bestStageScore = STAGES.reduce((max, stage) => Math.max(max, getStageRecord(stage.id).bestScore || 0), 0);
            const endlessRecord = getSpecialRecord("endlessBoss");
            const modeLabel = getTypingModeLongLabel();

            el.stageSelectSummary.innerHTML = `
                Nội dung đang luyện:<b>${modeLabel}</b> ｜ Điểm cao nhất:<b>${Math.round(bestStageScore)}</b> ｜ Tổng lượt vượt ải:<b>${totalClears}</b> ｜ Tổng số sao:<b>${totalStars}/15</b>
                <br>Kỷ lục ma vương:<b>${Math.round(endlessRecord.bestScore || 0)}</b>（Vòng ${Math.round(endlessRecord.bestRounds || 0)}） ｜ Ải 5 cũng dùng nội dung đang chọn trong 3:00
            `;

            el.stageSelectGrid.innerHTML = STAGES.map((stage, index) => {
                const record = getStageRecord(stage.id);
                const pass = record.bestStars >= 1;
                const thumb = STAGE_TRACK[index]?.thumb || "/original/art/ui-location_thumb_forest.svg";
                const statusText = pass ? "Đã vượt ải" : "Chưa vượt ải";
                return `
                    <div class="stage-select-node ${pass ? "pass" : ""}">
                        <div class="stage-node-head">
                            <div class="stage-node-id">Ải ${stage.id}</div>
                            <div class="stage-node-grade">Cao nhất ${record.bestScore > 0 ? record.bestGrade : "--"}</div>
                        </div>
                        <img class="stage-node-thumb" src="${thumb}" alt="${stage.name}">
                        <div class="stage-node-title">${stage.name}</div>
                        <div class="stage-node-stars">${renderStars(record.bestStars)}</div>
                        <div class="stage-node-line">Điểm cao nhất:<b>${Math.round(record.bestScore)}</b></div>
                        <div class="stage-node-line">Kỷ lục: chính xác ${Math.round(record.bestAcc)}% / Liên kích ${Math.round(record.bestCombo)}</div>
                        <div class="stage-node-status ${pass ? "pass" : "fail"}">${statusText} ｜ 3:00 Tính điểm ｜ ${getTypingModeLabel()}</div>
                        <button class="wood-btn stage-node-play" data-stage-play="${index}">Vào ải</button>
                    </div>
                `;
            }).join("");

            refreshTypingModeButtons();
        }

        function openStageSelectScreen() {
            closeOverlays();
            game.mode = "stage-select";
            game.independentStageMode = true;
            game.endlessBossMode = false;
            setTitleOptionsOpen(false);
            setScene("title");
            playBgm("title");
            applyStageVisual(1);
            buildAmbientSparks(26);
            renderStageSelect();
            updateStageTrack();
            el.stageSelectScreen.classList.add("show");
            syncImeInputVisibility();
        }

        function openLeaderboardScreen() {
            closeOverlays();
            game.mode = "leaderboard";
            setTitleOptionsOpen(false);
            setScene("title");
            playBgm("title");
            applyStageVisual(1);
            buildAmbientSparks(26);
            renderTitleLeaderboard();
            if (el.leaderboardScreen) el.leaderboardScreen.classList.add("show");
            syncImeInputVisibility();
            if (isCloudWebhookConfigured() && (!game.cloud.lastSyncAt || (Date.now() - game.cloud.lastSyncAt) > 30000)) {
                fetchCloudLeaderboard({ silent: true });
            }
        }

        function beginStageChallenge(index, bossChallenge = false) {
            closeOverlays();
            const typingMode = getTypingModeKey();
            resetRun(false);
            game.mode = "transition";
            game.independentStageMode = true;
            game.practiceMode = false;
            applyTypingMode(typingMode);
            game.endlessBossMode = false;
            game.selectedStageIndex = index;
            game.bossChallengeMode = !!bossChallenge;
            const clearCount = getStageRecord(index + 1).clearCount || 0;
            loadStage(index, clearCount > 0);
        }

        function beginEndlessBossMode() {
            closeOverlays();
            const typingMode = getTypingModeKey();
            resetRun(false);
            game.mode = "transition";
            game.practiceMode = false;
            applyTypingMode(typingMode);
            game.independentStageMode = false;
            game.bossChallengeMode = true;
            game.endlessBossMode = true;
            game.selectedStageIndex = 4;
            loadStage(4, true);
            showCoach(`Bắt đầu chế độ ma vương:${getTypingModeLabel()}・Chiến đấu liên tục cho đến khi hết sinh lực.`, 1200);
        }

        function beginChineseMode(variant = "hanzi") {
            const modeKey = variant === "bopomofo" ? "zh-bpmf" : "zh-hanzi";
            resetRun(true);
            applyTypingMode(modeKey);
            openStageSelectScreen();
            showCoach(
                modeKey === "zh-bpmf"
                    ? "Đã chọn chú âm cho cả năm ải."
                    : "Đã chọn chữ Hán cho cả năm ải.",
                1400
            );
        }

        function readProfile() {
            try {
                const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed && typeof parsed === "object") {
                        game.profile = {
                            ...game.profile,
                            ...parsed
                        };
                    }
                }
            } catch (error) {
                // Ignore invalid local profile payload and fallback to defaults.
            }
            if (!Array.isArray(game.profile.achievements)) {
                game.profile.achievements = [];
            }
            if (typeof game.profile.playerName !== "string") {
                game.profile.playerName = "";
            }
            if (typeof game.profile.sheetWebhookUrl !== "string") {
                game.profile.sheetWebhookUrl = "";
            }
            game.profile.playerName = game.profile.playerName.trim().slice(0, 20);
            game.profile.sheetWebhookUrl = game.profile.sheetWebhookUrl.trim();
            if (!game.profile.sheetWebhookUrl) {
                game.profile.sheetWebhookUrl = DEFAULT_CLOUD_WEBHOOK_URL;
            }
            ensureStageRecordsShape();
            ensureSpecialRecordsShape();
            game.unlockedAchievements = new Set(game.profile.achievements);
        }

        function writeProfile() {
            try {
                localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(game.profile));
            } catch (error) {
                // Ignore storage quota or privacy mode errors.
            }
        }

        function escapeHtmlText(value) {
            return String(value ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/\"/g, "&quot;")
                .replace(/'/g, "&#39;");
        }

        function sanitizePlayerName(name) {
            return String(name || "").trim().slice(0, 20);
        }

        function getCloudWebhookUrl() {
            return String(game.profile.sheetWebhookUrl || "").trim();
        }

        function isCloudWebhookConfigured() {
            const url = getCloudWebhookUrl();
            return /^https?:\/\//i.test(url);
        }

        function setCloudSettingsStatus(text, tone = "neutral") {
            if (!el.cloudSettingsStatus) return;
            el.cloudSettingsStatus.textContent = text;
            el.cloudSettingsStatus.dataset.tone = tone;
        }

        function setCloudUploadStatus(text, tone = "neutral") {
            if (!el.cloudUploadStatus) return;
            el.cloudUploadStatus.textContent = text;
            el.cloudUploadStatus.dataset.tone = tone;
        }

        function setTitleLeaderboardStatus(text, tone = "neutral") {
            if (!el.titleLeaderboardStatus) return;
            el.titleLeaderboardStatus.textContent = text;
            el.titleLeaderboardStatus.dataset.tone = tone;
        }

        function syncCloudSettingsInputs() {
            if (el.cloudPlayerName) el.cloudPlayerName.value = game.profile.playerName || "";
            if (el.cloudSheetUrl) el.cloudSheetUrl.value = game.profile.sheetWebhookUrl || "";
        }

        function formatCloudTimestamp(ts) {
            if (!Number.isFinite(ts) || ts <= 0) return "";
            try {
                const d = new Date(ts);
                const hh = String(d.getHours()).padStart(2, "0");
                const mm = String(d.getMinutes()).padStart(2, "0");
                const ss = String(d.getSeconds()).padStart(2, "0");
                return `${hh}:${mm}:${ss}`;
            } catch (error) {
                return "";
            }
        }

        function getCloudLeaderboardEntry(stageId) {
            const key = String(stageId);
            const raw = game.cloud?.leaderboard?.[key];
            if (!raw || typeof raw !== "object") return null;
            return raw;
        }

        function getCloudTop3Entries(stageId) {
            const key = String(stageId);
            const rows = game.cloud?.top3ByStage?.[key];
            return Array.isArray(rows) ? rows : [];
        }

        function getCloudPlayerRankEntry(stageId) {
            const key = String(stageId);
            const raw = game.cloud?.playerRanksByStage?.[key];
            if (!raw || typeof raw !== "object") return null;
            return raw;
        }

        function describePlayerRankWithGap(playerRank, html = false) {
            if (!playerRank || !Number.isFinite(Number(playerRank.rank))) return "";
            const rank = Math.max(1, Math.round(Number(playerRank.rank)));
            const score = Math.max(0, Math.round(Number(playerRank.score) || 0));
            const gap = Math.max(0, Math.round(Number(playerRank.gapToPrevScore) || 0));
            const base = html
                ? `Thứ hạng hiện tại: <b>${rank}</b> hạng (${score} điểm)`
                : `Thứ hạng của bạn: ${rank} hạng (${score} điểm)`;
            if (rank <= 1) return `${base} ｜ Đang dẫn đầu`;
            if (Number.isFinite(Number(playerRank.prevScore))) {
                return `${base} ｜ Cách người phía trên ${gap} điểm`;
            }
            return base;
        }

        function renderCloudUploadRankboard() {
            if (!el.cloudUploadRankboard) return;
            const stage = getStage();
            const pending = game.cloud.pendingUpload;
            const stageId = Number(pending?.record?.stageId || stage?.id || 0);
            if (!stageId || stageId < 1 || stageId > STAGES.length) {
                el.cloudUploadRankboard.textContent = "Thành tích của ải này chỉ hiện ở 3:00 trong phần kết quả.";
                return;
            }

            const top3 = getCloudTop3Entries(stageId);
            const playerRank = getCloudPlayerRankEntry(stageId) || (game.cloud.lastSubmitRank && Number(game.cloud.lastSubmitRank.stageId) === stageId ? game.cloud.lastSubmitRank : null);
            if (!top3.length && !playerRank) {
                el.cloudUploadRankboard.textContent = "Chưa tải bảng xếp hạng của ải này.";
                return;
            }

            const rowsHtml = (top3.length ? top3.slice(0, 3) : [{ rank: 1, playerName: "Chưa có dữ liệu", score: 0 }]).map((row, index) => {
                const rank = Math.max(1, Math.round(Number(row.rank) || (index + 1)));
                const name = escapeHtmlText(row.playerName || "Đệ tử ẩn danh");
                const score = Math.max(0, Math.round(Number(row.score) || 0));
                const isYou = !!playerRank && playerRank.rank === rank && String(playerRank.playerName || "") === String(row.playerName || "");
                return `
                    <div class="rankboard-row ${isYou ? "you" : ""}">
                        <div>${rank}</div>
                        <div style="min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${name}</div>
                        <div>${score}</div>
                    </div>
                `;
            }).join("");

            let meta = "";
            if (playerRank && Number.isFinite(Number(playerRank.rank))) {
                meta = describePlayerRankWithGap(playerRank, true);
            } else if (sanitizePlayerName(game.profile.playerName)) {
                meta = "Chưa có thứ hạng trực tuyến.";
            } else {
                meta = "Nhập tên khi gửi điểm để xem thứ hạng.";
            }

            const stageLabel = STAGE_TRACK[stageId - 1]?.name || `Ải ${stageId}`;
            el.cloudUploadRankboard.innerHTML = `
                <div class="rankboard-title">${escapeHtmlText(stageLabel)} Bảng xếp hạng (đứng đầu 3 hạng)</div>
                <div class="rankboard-list">${rowsHtml}</div>
                <div class="rankboard-meta">${meta}</div>
            `;
        }

        function renderTitleLeaderboard() {
            if (!el.titleLeaderboardGrid) return;
            const cards = STAGES.map((stage) => {
                const entry = getCloudLeaderboardEntry(stage.id);
                const top3 = getCloudTop3Entries(stage.id);
                const playerRank = getCloudPlayerRankEntry(stage.id);
                const stageShortName = STAGE_TRACK[(stage.id || 1) - 1]?.name || `Ải ${stage.id}`;
                if (!entry) {
                    return `
                        <div class="lb-stage-card">
                            <div class="lb-stage-name">Ải${stage.id}ải ·${escapeHtmlText(stageShortName)}</div>
                            <div class="lb-stage-score">--</div>
                            <div class="lb-stage-player">Chưa có thành tích trực tuyến</div>
                            <div class="lb-you-rank">Thứ hạng sẽ hiện sau khi bạn gửi điểm.</div>
                        </div>
                    `;
                }
                const score = Math.max(0, Math.round(Number(entry.score) || 0));
                const player = escapeHtmlText(entry.playerName || "Đệ tử ẩn danh");
                const extra = [];
                if (entry.typingModeLabel) extra.push(escapeHtmlText(entry.typingModeLabel));
                if (entry.grade) extra.push(`Xếp hạng ${escapeHtmlText(entry.grade)}`);
                if (Number.isFinite(entry.stars)) extra.push(`${"★".repeat(clamp(Math.round(entry.stars), 0, 3))}${"☆".repeat(3 - clamp(Math.round(entry.stars), 0, 3))}`);
                const metaText = extra.length ? extra.join(" ｜ ") : "Điểm cao nhất trực tuyến";
                const top3Html = (top3.length ? top3.slice(0, 3) : [entry]).map((row, index) => {
                    const rank = Math.max(1, Math.round(Number(row.rank) || (index + 1)));
                    return `
                        <div class="lb-top3-row">
                            <div class="lb-top3-rank">${rank}</div>
                            <div class="lb-top3-name">${escapeHtmlText(row.playerName || "Đệ tử ẩn danh")}</div>
                            <div class="lb-top3-score">${Math.max(0, Math.round(Number(row.score) || 0))}</div>
                        </div>
                    `;
                }).join("");
                const youRankText = playerRank && Number.isFinite(Number(playerRank.rank))
                    ? describePlayerRankWithGap(playerRank, false)
                    : (sanitizePlayerName(game.profile.playerName) ? "Chưa có thứ hạng" : "Nhập tên để theo dõi thứ hạng");
                return `
                    <div class="lb-stage-card">
                        <div class="lb-stage-name">Ải${stage.id}ải ·${escapeHtmlText(stageShortName)}</div>
                        <div class="lb-stage-score">${score}</div>
                        <div class="lb-stage-player">${player}</div>
                        <div class="lb-stage-player">${metaText}</div>
                        <div class="lb-top3-list">${top3Html}</div>
                        <div class="lb-you-rank">${escapeHtmlText(youRankText)}</div>
                    </div>
                `;
            }).join("");
            el.titleLeaderboardGrid.innerHTML = cards;
            renderCloudUploadRankboard();
        }

        function buildCloudRequestUrl(action, extraParams = null) {
            const raw = getCloudWebhookUrl();
            if (!raw) return "";
            try {
                const url = new URL(raw);
                if (action) url.searchParams.set("action", action);
                const playerName = sanitizePlayerName(game.profile.playerName || "");
                if (playerName) {
                    url.searchParams.set("playerName", playerName);
                }
                if (extraParams && typeof extraParams === "object") {
                    Object.entries(extraParams).forEach(([key, value]) => {
                        if (value === undefined || value === null || value === "") return;
                        url.searchParams.set(String(key), String(value));
                    });
                }
                url.searchParams.set("_ts", String(Date.now()));
                return url.toString();
            } catch (error) {
                return "";
            }
        }

        async function parseCloudResponsePayload(response) {
            const text = await response.text();
            if (!text) return null;
            try {
                return JSON.parse(text);
            } catch (error) {
                return { rawText: text };
            }
        }

        function parseStageIdFromUnknown(value) {
            if (Number.isFinite(Number(value))) {
                const n = Math.round(Number(value));
                return n >= 1 && n <= STAGES.length ? n : 0;
            }
            const str = String(value || "");
            const match = str.match(/(\d+)/);
            if (!match) return 0;
            const n = Number(match[1]);
            return Number.isFinite(n) && n >= 1 && n <= STAGES.length ? n : 0;
        }

        function normalizeCloudScoreRow(row, fallbackStageId = 0) {
            if (!row || typeof row !== "object") return null;
            const stageId = parseStageIdFromUnknown(
                row.stageId ?? row.stage_id ?? row.stage ?? row.level ?? row.levelId ?? row.stageIndex ?? fallbackStageId
            );
            if (!stageId) return null;

            const score = Number(
                row.score ?? row.bestScore ?? row.best_score ?? row.points ?? row.total ?? row.finalScore ?? row.final_score ?? 0
            );
            if (!Number.isFinite(score)) return null;

            const starsRaw = Number(row.stars ?? row.bestStars ?? row.best_stars ?? row.star ?? -1);
            const accRaw = Number(row.acc ?? row.accuracy ?? row.accuracyRate ?? row.correctRate ?? row.correct_rate ?? 0);
            const comboRaw = Number(row.maxCombo ?? row.max_combo ?? row.combo ?? 0);
            const typedRaw = Number(row.totalTyped ?? row.total_typed ?? row.typed ?? row.keys ?? row.totalKeys ?? 0);
            const timestampRaw = row.timestamp ?? row.time ?? row.createdAt ?? row.created_at ?? row.updatedAt ?? row.updated_at ?? row.date;
            const ts = Number.isFinite(Number(timestampRaw))
                ? Number(timestampRaw)
                : (timestampRaw ? Date.parse(String(timestampRaw)) : 0);
            const playerName = sanitizePlayerName(
                row.playerName ?? row.player_name ?? row.nickname ?? row.name ?? row.player ?? row.user ?? ""
            ) || "Đệ tử ẩn danh";
            const typingMode = String(row.typingMode ?? row.typing_mode ?? row.mode ?? row.inputMode ?? "").trim();
            const typingModeLabel = String(row.typingModeLabel ?? row.typing_mode_label ?? row.modeLabel ?? row.mode_label ?? "").trim();
            const grade = String(row.grade ?? row.bestGrade ?? row.best_grade ?? "").trim().toUpperCase().slice(0, 2);

            return {
                stageId,
                score,
                stars: Number.isFinite(starsRaw) ? clamp(Math.round(starsRaw), 0, 3) : null,
                acc: Number.isFinite(accRaw) ? Math.round(accRaw) : 0,
                maxCombo: Number.isFinite(comboRaw) ? Math.round(comboRaw) : 0,
                typed: Number.isFinite(typedRaw) ? Math.round(typedRaw) : 0,
                playerName,
                typingMode,
                typingModeLabel: typingModeLabel || (typingMode ? getTypingModeLabel(typingMode) : ""),
                grade: grade || "",
                timestamp: Number.isFinite(ts) ? ts : 0
            };
        }

        function collectCloudRowsFromPayload(payload) {
            if (!payload) return [];
            if (Array.isArray(payload)) return payload;
            if (typeof payload !== "object") return [];

            const arrayKeys = ["rows", "data", "items", "records", "list"];
            for (const key of arrayKeys) {
                if (Array.isArray(payload[key])) return payload[key];
            }

            if (payload.result && typeof payload.result === "object") {
                const nested = collectCloudRowsFromPayload(payload.result);
                if (nested.length) return nested;
            }
            if (payload.payload && typeof payload.payload === "object") {
                const nested = collectCloudRowsFromPayload(payload.payload);
                if (nested.length) return nested;
            }
            if (payload.leaderboard && Array.isArray(payload.leaderboard)) return payload.leaderboard;

            const byStageObj = payload.leaderboard && typeof payload.leaderboard === "object"
                ? payload.leaderboard
                : (payload.stageBest && typeof payload.stageBest === "object"
                    ? payload.stageBest
                    : (payload.stages && typeof payload.stages === "object" ? payload.stages : null));
            if (byStageObj) {
                return Object.entries(byStageObj).map(([stageKey, value]) => {
                    if (value && typeof value === "object" && !Array.isArray(value)) {
                        return { ...value, stageId: value.stageId ?? stageKey };
                    }
                    return { stageId: stageKey, score: Number(value) || 0 };
                });
            }

            return [];
        }

        function normalizeCloudLeaderboardPayload(payload) {
            const rows = collectCloudRowsFromPayload(payload);
            const bestByStage = {};

            rows.forEach((rawRow) => {
                const normalized = normalizeCloudScoreRow(rawRow);
                if (!normalized) return;
                const key = String(normalized.stageId);
                const current = bestByStage[key];
                if (!current) {
                    bestByStage[key] = normalized;
                    return;
                }
                const normalizedScore = Number(normalized.score) || 0;
                const currentScore = Number(current.score) || 0;
                const betterScore = normalizedScore > currentScore;
                const newerTie = normalizedScore === currentScore && (normalized.timestamp || 0) > (current.timestamp || 0);
                if (betterScore || newerTie) {
                    bestByStage[key] = normalized;
                }
            });

            return bestByStage;
        }

        function normalizeCloudTop3ByStagePayload(payload) {
            const out = {};
            if (payload && typeof payload === "object") {
                const top3Obj = payload.top3ByStage && typeof payload.top3ByStage === "object"
                    ? payload.top3ByStage
                    : (payload.top3 && typeof payload.top3 === "object" && !Array.isArray(payload.top3) ? payload.top3 : null);
                if (top3Obj) {
                    Object.entries(top3Obj).forEach(([stageKey, list]) => {
                        const stageId = parseStageIdFromUnknown(stageKey);
                        if (!stageId) return;
                        const normalizedList = (Array.isArray(list) ? list : [])
                            .map((row, index) => {
                                const normalized = normalizeCloudScoreRow({ ...row, stageId: row?.stageId ?? stageId });
                                if (!normalized) return null;
                                const rank = Number(row?.rank);
                                return {
                                    ...normalized,
                                    rank: Number.isFinite(rank) ? Math.max(1, Math.round(rank)) : (index + 1)
                                };
                            })
                            .filter(Boolean)
                            .sort((a, b) => (a.rank || 999) - (b.rank || 999))
                            .slice(0, 3);
                        out[String(stageId)] = normalizedList;
                    });
                }
            }

            if (Object.keys(out).length === 0) {
                const bestByStage = normalizeCloudLeaderboardPayload(payload);
                Object.entries(bestByStage).forEach(([stageKey, row]) => {
                    out[String(stageKey)] = [{ ...row, rank: 1 }];
                });
            }

            return out;
        }

        function normalizeCloudPlayerRanksByStagePayload(payload) {
            const out = {};
            if (!payload || typeof payload !== "object") return out;
            const ranksObj = payload.playerRanksByStage && typeof payload.playerRanksByStage === "object"
                ? payload.playerRanksByStage
                : null;
            if (ranksObj) {
                Object.entries(ranksObj).forEach(([stageKey, row]) => {
                    const stageId = parseStageIdFromUnknown(stageKey);
                    if (!stageId || !row || typeof row !== "object") return;
                    const normalized = normalizeCloudScoreRow({ ...row, stageId: row.stageId ?? stageId });
                    if (!normalized) return;
                    const rank = Number(row.rank ?? row.place ?? row.position);
                    if (!Number.isFinite(rank)) return;
                    const prevScore = Number(row.prevScore ?? row.previousScore ?? row.prev_score);
                    const gapToPrevScore = Number(row.gapToPrevScore ?? row.gapScore ?? row.gap_to_prev_score);
                    out[String(stageId)] = {
                        ...normalized,
                        rank: Math.max(1, Math.round(rank)),
                        prevScore: Number.isFinite(prevScore) ? Math.max(0, Math.round(prevScore)) : null,
                        gapToPrevScore: Number.isFinite(gapToPrevScore) ? Math.max(0, Math.round(gapToPrevScore)) : null
                    };
                });
            }

            if (payload.playerRank && typeof payload.playerRank === "object") {
                const stageId = parseStageIdFromUnknown(payload.playerRank.stageId);
                const normalized = normalizeCloudScoreRow(payload.playerRank);
                const rank = Number(payload.playerRank.rank ?? payload.playerRank.place ?? payload.playerRank.position);
                if (stageId && normalized && Number.isFinite(rank)) {
                    const prevScore = Number(payload.playerRank.prevScore ?? payload.playerRank.previousScore ?? payload.playerRank.prev_score);
                    const gapToPrevScore = Number(payload.playerRank.gapToPrevScore ?? payload.playerRank.gapScore ?? payload.playerRank.gap_to_prev_score);
                    out[String(stageId)] = {
                        ...normalized,
                        rank: Math.max(1, Math.round(rank)),
                        prevScore: Number.isFinite(prevScore) ? Math.max(0, Math.round(prevScore)) : null,
                        gapToPrevScore: Number.isFinite(gapToPrevScore) ? Math.max(0, Math.round(gapToPrevScore)) : null
                    };
                }
            }

            return out;
        }

        function applyCloudLeaderboard(payload) {
            const normalized = normalizeCloudLeaderboardPayload(payload);
            if (!normalized || typeof normalized !== "object") return false;
            game.cloud.leaderboard = normalized;
            game.cloud.top3ByStage = normalizeCloudTop3ByStagePayload(payload);
            const playerRanks = normalizeCloudPlayerRanksByStagePayload(payload);
            if (playerRanks && typeof playerRanks === "object" && Object.keys(playerRanks).length > 0) {
                game.cloud.playerRanksByStage = {
                    ...game.cloud.playerRanksByStage,
                    ...playerRanks
                };
            }
            if (payload && typeof payload === "object" && payload.playerRank && typeof payload.playerRank === "object") {
                const rankEntry = normalizeCloudPlayerRanksByStagePayload({ playerRank: payload.playerRank });
                const values = Object.values(rankEntry);
                game.cloud.lastSubmitRank = values.length ? values[0] : null;
            }
            renderTitleLeaderboard();
            return true;
        }

        function syncCloudUploadPanelState() {
            const pending = game.cloud.pendingUpload;
            if (el.btnUploadScore) {
                const disableUpload =
                    !pending ||
                    game.cloud.uploading ||
                    !isCloudWebhookConfigured() ||
                    !!pending.uploaded;
                el.btnUploadScore.disabled = !!disableUpload;
                el.btnUploadScore.textContent = game.cloud.uploading
                    ? "Đang gửi..."
                    : (pending?.uploaded ? "Đã gửi" : "Gửi điểm");
            }
            if (el.btnCloudRefreshResult) {
                el.btnCloudRefreshResult.disabled = !!game.cloud.loading;
            }
            renderCloudUploadRankboard();
        }

        function prepareCloudUploadFromResult({ stage, finalScore, acc, stageEval }) {
            const canUpload = !!stage && game.independentStageMode && !game.practiceMode && !game.endlessBossMode;
            if (!canUpload) {
                game.cloud.pendingUpload = null;
                if (game.endlessBossMode) {
                    setCloudUploadStatus("Điểm ma vương vô tận được lưu riêng.", "neutral");
                } else if (game.practiceMode) {
                    setCloudUploadStatus("Lượt luyện bổ sung không gửi lên bảng xếp hạng.", "neutral");
                } else {
                    setCloudUploadStatus("Chỉ hỗ trợ năm ải 3:00 để gửi kết quả.", "neutral");
                }
                syncCloudUploadPanelState();
                return;
            }

            const record = {
                action: "submitScore",
                stageId: stage.id,
                stageName: STAGE_TRACK[(stage.id || 1) - 1]?.name || stage.name || `Ải ${stage.id}`,
                score: Math.round(finalScore),
                accuracy: Math.round(acc),
                maxCombo: Math.round(game.maxCombo),
                totalTyped: Math.round(game.totalTyped),
                totalKeys: Math.round(game.totalTyped),
                defeated: Math.round(game.defeated || 0),
                stars: Math.round(stageEval?.stars || 0),
                grade: String(stageEval?.grade || "D"),
                pass: !!stageEval?.pass,
                typingMode: getTypingModeKey(),
                typingModeLabel: getTypingModeLabel(),
                playerName: sanitizePlayerName(game.profile.playerName) || "Đệ tử ẩn danh",
                durationSec: STAGE_CHALLENGE_SECONDS,
                submittedAt: new Date().toISOString(),
                clientVersion: "web-final"
            };

            game.cloud.pendingUpload = {
                record,
                uploaded: false,
                uploadedAt: 0
            };
            game.cloud.lastSubmitRank = null;

            if (!isCloudWebhookConfigured()) {
                setCloudUploadStatus("Hãy điền trong phần thiết lập Google Apps Script Web App URL, rồi gửi lại.", "warn");
            } else {
                setCloudUploadStatus("Xác nhận và nhập tên trước khi gửi điểm lên Google Sheet.", "neutral");
            }
            syncCloudUploadPanelState();
        }

        async function fetchCloudLeaderboard(options = {}) {
            const { silent = false } = options;
            const url = buildCloudRequestUrl("leaderboard");
            if (!url) {
                if (!silent) showToast("Hãy thiết lập trước Google Sheet Web App URL", 900);
                game.cloud.lastError = "";
                setCloudSettingsStatus("Hãy nhập trước Google Apps Script Web App URL.", "warn");
                setTitleLeaderboardStatus("Chưa thiết lập URL", "warn");
                renderTitleLeaderboard();
                syncCloudUploadPanelState();
                return null;
            }

            game.cloud.loading = true;
            game.cloud.lastError = "";
            setCloudSettingsStatus("Đang cập nhật bảng xếp hạng...", "loading");
            setTitleLeaderboardStatus("Đang đồng bộ...", "loading");
            if (game.mode === "result") setCloudUploadStatus("Đang cập nhật thành tích...", "loading");
            syncCloudUploadPanelState();

            try {
                const response = await fetch(url, {
                    method: "GET",
                    cache: "no-store"
                });
                const payload = await parseCloudResponsePayload(response);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                const ok = applyCloudLeaderboard(payload);
                game.cloud.lastSyncAt = Date.now();
                const syncTime = formatCloudTimestamp(game.cloud.lastSyncAt);
                if (!ok) {
                    setTitleLeaderboardStatus("Không đọc được định dạng bảng xếp hạng", "warn");
                    setCloudSettingsStatus("Không đọc được dữ liệu trả về.", "warn");
                    if (game.mode === "result") setCloudUploadStatus("Đã kết nối nhưng không đọc được bảng xếp hạng.", "warn");
                } else {
                    setTitleLeaderboardStatus(syncTime ? `Đã cập nhật ${syncTime}` : "Đã cập nhật", "ok");
                    setCloudSettingsStatus("Đã cập nhật thành tích.", "ok");
                    if (game.mode === "result") setCloudUploadStatus("Đã cập nhật bảng xếp hạng.", "ok");
                }
                return game.cloud.leaderboard;
            } catch (error) {
                const message = error?.message ? String(error.message) : "Kết nối thất bại";
                game.cloud.lastError = message;
                setTitleLeaderboardStatus("Đồng bộ thất bại", "error");
                setCloudSettingsStatus(`Đồng bộ thất bại:${message}`, "error");
                if (game.mode === "result") setCloudUploadStatus(`Không cập nhật được thành tích:${message}`, "error");
                if (!silent) showToast("Không đồng bộ được thành tích", 900);
                return null;
            } finally {
                game.cloud.loading = false;
                syncCloudUploadPanelState();
            }
        }

        async function uploadPendingCloudScore() {
            const pending = game.cloud.pendingUpload;
            if (!pending || !pending.record) {
                setCloudUploadStatus("Chưa có kết quả để gửi.", "warn");
                syncCloudUploadPanelState();
                return;
            }
            const url = getCloudWebhookUrl();
            if (!isCloudWebhookConfigured()) {
                setCloudUploadStatus("Hãy điền trong phần thiết lập Google Apps Script Web App URL.", "warn");
                showToast("Thiết lập trước Google Sheet URL", 900);
                syncCloudUploadPanelState();
                return;
            }

            const consent = window.confirm("Bạn có muốn gửi thành tích lên bảng xếp hạng không?");
            if (!consent) {
                setCloudUploadStatus("Đã hủy gửi. Thành tích vẫn được lưu trên máy này.", "neutral");
                syncCloudUploadPanelState();
                return;
            }

            const currentName = sanitizePlayerName(game.profile.playerName || el.cloudPlayerName?.value || "");
            const nameInput = window.prompt("Nhập tên hiển thị (20ký tự)", currentName || "");
            if (nameInput === null) {
                setCloudUploadStatus("Đã hủy gửi vì chưa nhập tên.", "neutral");
                syncCloudUploadPanelState();
                return;
            }
            const savedName = sanitizePlayerName(nameInput);
            if (!savedName) {
                setCloudUploadStatus("Tên không được để trống. Đã hủy gửi.", "warn");
                syncCloudUploadPanelState();
                return;
            }
            if (savedName !== (game.profile.playerName || "")) {
                game.profile.playerName = savedName;
                writeProfile();
                syncCloudSettingsInputs();
            }

            const record = {
                ...pending.record,
                playerName: savedName,
                submittedAt: new Date().toISOString()
            };

            game.cloud.uploading = true;
            setCloudUploadStatus("Đang gửi thành tích đến Google Sheet...", "loading");
            setCloudSettingsStatus("Đang gửi thành tích...", "loading");
            syncCloudUploadPanelState();

            try {
                const body = new URLSearchParams();
                body.set("action", "submitScore");
                body.set("record", JSON.stringify(record));

                const response = await fetch(url, {
                    method: "POST",
                    body,
                    cache: "no-store"
                });
                const payload = await parseCloudResponsePayload(response);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                let leaderboardUpdated = false;
                let playerRankText = "";
                if (payload && typeof payload === "object") {
                    leaderboardUpdated = applyCloudLeaderboard(payload);
                    if (!leaderboardUpdated && payload.leaderboard) {
                        leaderboardUpdated = applyCloudLeaderboard(payload.leaderboard);
                    }
                    const rank = Number(payload.playerRank?.rank);
                    const score = Number(payload.playerRank?.score ?? record.score);
                    if (Number.isFinite(rank)) {
                        const gap = Math.max(0, Math.round(Number(payload.playerRank?.gapToPrevScore) || 0));
                        if (Math.max(1, Math.round(rank)) > 1 && Number.isFinite(Number(payload.playerRank?.prevScore))) {
                            playerRankText = `Thứ hạng hiện tại: ${Math.max(1, Math.round(rank))} hạng (${Math.max(0, Math.round(score || 0))} điểm), cách người trên ${gap} điểm`;
                        } else if (Math.max(1, Math.round(rank)) === 1) {
                            playerRankText = `Thứ hạng hiện tại: 1 hạng (${Math.max(0, Math.round(score || 0))} điểm)`;
                        } else {
                            playerRankText = `Thứ hạng hiện tại: ${Math.max(1, Math.round(rank))} hạng (${Math.max(0, Math.round(score || 0))} điểm)`;
                        }
                    }
                }

                game.cloud.pendingUpload = {
                    record,
                    uploaded: true,
                    uploadedAt: Date.now()
                };
                setCloudUploadStatus(playerRankText ? `Đã gửi thành tích,${playerRankText}.` : "Đã gửi thành tích.", "ok");
                setCloudSettingsStatus("Đã gửi thành tích.", "ok");
                if (leaderboardUpdated) {
                    const syncTime = formatCloudTimestamp(Date.now());
                    setTitleLeaderboardStatus(syncTime ? `Đã cập nhật ${syncTime}` : "Đã cập nhật", "ok");
                } else {
                    await fetchCloudLeaderboard({ silent: true });
                }
                showToast("Đã gửi thành tích", 900);
            } catch (error) {
                const message = error?.message ? String(error.message) : "Gửi thất bại";
                setCloudUploadStatus(`Gửi thất bại:${message}`, "error");
                setCloudSettingsStatus(`Gửi thất bại:${message}`, "error");
                showToast("Không gửi được thành tích", 900);
            } finally {
                game.cloud.uploading = false;
                syncCloudUploadPanelState();
            }
        }

        function saveCloudSettings() {
            const playerName = sanitizePlayerName(el.cloudPlayerName?.value || "");
            const sheetWebhookUrl = String(el.cloudSheetUrl?.value || "").trim() || DEFAULT_CLOUD_WEBHOOK_URL;
            game.profile.playerName = playerName;
            game.profile.sheetWebhookUrl = sheetWebhookUrl;
            if (!playerName) {
                game.cloud.playerRanksByStage = {};
                game.cloud.lastSubmitRank = null;
            }
            writeProfile();
            syncCloudSettingsInputs();
            if (!sheetWebhookUrl) {
                setCloudSettingsStatus("Đã lưu. Chưa có địa chỉ URL.", "neutral");
                setTitleLeaderboardStatus("Chưa thiết lập URL", "warn");
                game.cloud.leaderboard = {};
                renderTitleLeaderboard();
            } else if (!/^https?:\/\//i.test(sheetWebhookUrl)) {
                setCloudSettingsStatus("Đã lưu, nhưng URL Định dạng chưa đúng.", "warn");
            } else {
                setCloudSettingsStatus("Đã lưu thiết lập.", "ok");
                fetchCloudLeaderboard({ silent: true });
            }
            if (game.mode === "result" && game.cloud.pendingUpload?.record) {
                prepareCloudUploadFromResult({
                    stage: getStage(),
                    finalScore: game.cloud.pendingUpload.record.score,
                    acc: game.cloud.pendingUpload.record.accuracy,
                    stageEval: {
                        stars: game.cloud.pendingUpload.record.stars,
                        grade: game.cloud.pendingUpload.record.grade,
                        pass: game.cloud.pendingUpload.record.pass
                    }
                });
            } else {
                syncCloudUploadPanelState();
            }
            renderTitleLeaderboard();
        }

        function applyAccessibilityOptions() {
            document.body.classList.toggle("access-contrast", !!game.profile.highContrast);
            document.body.classList.toggle("reduce-motion", !!game.profile.reducedMotion);
        }

        function refreshOptionButtons() {
            el.btnAssist.textContent = `Hỗ trợ:${game.profile.assistMode ? "bật" : "tắt"}`;
            el.btnContrast.textContent = `Tương phản cao:${game.profile.highContrast ? "bật" : "tắt"}`;
            el.btnMotion.textContent = `Giảm chuyển động:${game.profile.reducedMotion ? "bật" : "tắt"}`;
        }

        function setTitleOptionsOpen(open) {
            game.titleOptionsOpen = !!open;
            el.titleMore.classList.toggle("show", game.titleOptionsOpen);
            el.btnTitleSettings.textContent = game.titleOptionsOpen ? "Thu gọn thiết lập" : "Thiết lập";
        }

        function renderActionGuide(stage, data) {
            if (!stage || !data) return;
            let items = [];

            if (stage.mechanic === "homefall") {
                items = [
                    { icon: "/original/art/ui-icon_scroll_pixel.svg", text: game.chineseMode ? "Gõ ký hiệu chú âm" : "Gõ phù văn", active: true },
                    { icon: "/original/art/ui-icon_mp_pixel.svg", text: `Tích khí ${data.charge}/${data.chargeNeed}`, active: data.charge + 1 >= data.chargeNeed },
                    { icon: "/original/art/ui-icon_sword_pixel.svg", text: "Đầy khí tự chém", active: data.charge + 1 >= data.chargeNeed }
                ];
            } else if (stage.mechanic === "top_anchor") {
                const guarding = data.expectedType === "anchor";
                const cloudReady = data.cloudCharge >= data.cloudNeed;
                items = [
                    { icon: "/original/art/ui-icon_atk_pixel.svg", text: game.chineseMode ? "Chú âm đạp mây" : "Q~P Đạp mây", active: !guarding && !cloudReady },
                    { icon: "/original/art/ui-icon_def_pixel.svg", text: "F/J Đỡ đòn", active: guarding || cloudReady },
                    { icon: "/original/art/ui-icon_sword_pixel.svg", text: `Nổ mây ${data.burstCount}/${data.targetBurst}`, active: cloudReady }
                ];
            } else if (stage.mechanic === "bottom_defense") {
                const burstReady = data.shieldCharge + 1 >= data.shieldNeed;
                items = [
                    { icon: "/original/art/ui-icon_def_pixel.svg", text: game.chineseMode ? "Ký hiệu đỡ đòn" : "Z~M Đỡ đòn", active: true },
                    { icon: "/original/art/ui-icon_mp_pixel.svg", text: `Khí khiên ${data.shieldCharge}/${data.shieldNeed}`, active: burstReady },
                    { icon: "/original/art/ui-icon_sword_pixel.svg", text: `Phản kích ${data.counterBursts}/${data.targetBurst}`, active: burstReady }
                ];
            } else if (stage.mechanic === "word_combo") {
                items = [
                    { icon: "/original/art/ui-icon_scroll_pixel.svg", text: game.chineseMode ? (game.zhModeVariant === "bopomofo" ? "Nhìn cả chuỗi chú âm" : "Nhìn cả từ") : "Nhìn cả từ", active: true },
                    { icon: "/original/art/ui-icon_atk_pixel.svg", text: game.chineseMode ? (game.zhModeVariant === "bopomofo" ? "Bấm đúng phím" : "Đã chọn chữ") : "Gõ hết liên tục", active: data.progress > 0 },
                    { icon: "/original/art/ui-icon_sword_pixel.svg", text: `Phá bùa ${data.completed}/${data.target}`, active: data.progress > 0 }
                ];
            } else if (stage.mechanic === "boss_raid") {
                if (data.guardMode) {
                    items = [
                        { icon: "/original/art/ui-icon_def_pixel.svg", text: `Bấm ${data.guardKey.toUpperCase()}`, active: true },
                        { icon: "/original/art/ui-icon_sword_pixel.svg", text: "Đỡ đòn rồi phản kích", active: true },
                        { icon: "/original/art/ui-icon_mp_pixel.svg", text: `Nội lực ${Math.round(game.qi)}/100`, active: game.qi >= game.maxQi }
                    ];
                } else {
                    const counterText = data.counterWindow > 0
                        ? `Phản kích x${(data.counterBonus || 1).toFixed(2)} ${data.counterWindow.toFixed(1)}s`
                        : `Ải ${data.phase || 1} Giai đoạn`;
                    items = [
                        { icon: "/original/art/ui-icon_scroll_pixel.svg", text: game.chineseMode ? (game.zhModeVariant === "bopomofo" ? "Gõ đủ chuỗi chú âm" : "Gõ đầy đủ từ") : "Gõ đầy đủ từ", active: true },
                        { icon: "/original/art/ui-icon_sword_pixel.svg", text: counterText, active: data.counterWindow > 0 || (data.phase || 1) >= 2 },
                        { icon: "/original/art/ui-icon_mp_pixel.svg", text: `Space ${Math.round(game.qi)}/100`, active: game.qi >= game.maxQi }
                    ];
                }
            }

            const chips = items.map((item) => `
                <span class="guide-chip ${item.active ? "active" : ""}">
                    <img src="${item.icon}" alt="">
                    <span>${item.text}</span>
                </span>
            `).join("");
            if (el.objectiveGuide) el.objectiveGuide.innerHTML = chips;
        }

        function updateBossQteUI() {
            const stage = getStage();
            const data = game.stageData;
            if (!stage || stage.mechanic !== "boss_raid" || !data || game.mode !== "playing") {
                el.bossQtePanel.classList.remove("show", "danger");
                el.counterWindowPanel.classList.remove("show");
                return;
            }

            const now = performance.now();
            if (data.guardMode) {
                const remainMs = Math.max(0, data.guardDeadline - now);
                const duration = Math.max(1, data.guardDuration || 1);
                const ratio = clamp(remainMs / duration, 0, 1);
                el.bossQtePanel.classList.add("show");
                el.bossQtePanel.classList.toggle("danger", remainMs <= 900);
                el.bossQteKey.textContent = (data.guardKey || "f").toUpperCase();
                el.bossQteCountdown.textContent = `${(remainMs / 1000).toFixed(2)}s`;
                el.bossQteFill.style.width = `${Math.round(ratio * 100)}%`;
            } else {
                el.bossQtePanel.classList.remove("show", "danger");
            }

            if (data.counterWindow > 0) {
                const ratio = clamp(data.counterWindow / Math.max(0.1, data.counterWindowMax || 0.1), 0, 1);
                el.counterWindowPanel.classList.add("show");
                el.counterWindowTime.textContent = `${data.counterWindow.toFixed(2)}s x${(data.counterBonus || 1).toFixed(2)}`;
                el.counterWindowFill.style.width = `${Math.round(ratio * 100)}%`;
            } else {
                el.counterWindowPanel.classList.remove("show");
            }
        }

        function updateStage2QteUI() {
            if (!el.stage2QtePanel) return;
            const stage = getStage();
            const data = game.stageData;
            const active = !!stage && !!data && game.mode === "playing" && stage.mechanic === "top_anchor" && Number.isFinite(data.deadline) && data.deadline > 0;
            if (!active) {
                el.stage2QtePanel.classList.remove("show", "danger");
                return;
            }

            const remainMs = Math.max(0, data.deadline - performance.now());
            const duration = Math.max(1, data.deadlineDuration || 1);
            const ratio = clamp(remainMs / duration, 0, 1);
            const isGuard = data.expectedType === "anchor";
            el.stage2QtePanel.classList.add("show");
            el.stage2QtePanel.classList.toggle("danger", remainMs <= 650);
            el.stage2QteLabel.textContent = isGuard ? "Thời hạn đỡ đòn" : "Thời hạn đạp mây";
            el.stage2QteKey.textContent = getKeyPromptLabel(data.expectedKey || "q");
            el.stage2QteCountdown.textContent = `${(remainMs / 1000).toFixed(2)}s`;
            el.stage2QteFill.style.width = `${Math.round(ratio * 100)}%`;
        }

        function updateLearningPanel() {
            if (!el.learningLive || !el.learningTip) return;
            const stage = getStage();
            const acc = calcAccuracy();
            const recentAcc = getRecentAccuracy();
            const stability = recentAcc >= 0.95 ? "S" : recentAcc >= 0.9 ? "A" : recentAcc >= 0.82 ? "B" : "C";

            el.learningLive.textContent = `Tình hình: ổn định ${stability} ｜ Chính xác ${acc}% ｜ Liên kích ${game.maxCombo}`;

            let tip = "Nhìn chữ rồi mới gõ, giữ nhịp liên tục.";
            if (stage?.mechanic === "boss_raid") {
                if (game.stageData?.guardMode) tip = `Ma vương đánh nhanh! Bấm ngay ${game.stageData.guardKey.toUpperCase()} đỡ đòn.`;
                else if ((game.stageData?.counterWindow || 0) > 0) tip = "Đã mở cơ hội phản kích. Gõ liên tiếp để tăng sát thương.";
                else if (acc < 88) tip = "Đấu ma vương cần gõ đúng trước, rồi tăng tốc dần.";
                else tip = "khi thấy ĐỠ ĐÒN Đỡ đòn trước rồi phản công dứt khoát.";
            } else if (acc < 85) {
                tip = "Chậm lại một chút, tập trung gõ chính xác trước.";
            } else if (game.chineseMode && stage?.mechanic === "word_combo") {
                tip = game.zhModeVariant === "bopomofo"
                    ? "Nhìn cả chuỗi chú âm rồi bấm các phím tương ứng."
                    : "Nhìn cả từ và cách đọc, rồi dùng bộ gõ chọn đúng chữ.";
            } else if (game.maxCombo < 10) {
                tip = "Thử gõ đúng liên tiếp. Chuỗi càng dài, chiêu càng mạnh.";
            } else if (game.totalTyped < 120) {
                tip = "Giữ nhịp gõ ổn định để tăng số phím chính xác.";
            }

            el.learningTip.textContent = `Tiếp theo:${tip}`;
        }

        function showCoach(text, duration = 1200) {
            el.coachStrip.textContent = text;
            el.coachStrip.classList.add("show");
            clearTimeout(game.coachTimer);
            game.coachTimer = setTimeout(() => {
                el.coachStrip.classList.remove("show");
            }, duration);
        }

        function recordKeyStat(key, correct) {
            if (!/^[a-z;]$/.test(key || "")) return;
            if (!game.analytics.keyStats[key]) {
                game.analytics.keyStats[key] = { hit: 0, miss: 0 };
            }
            if (correct) game.analytics.keyStats[key].hit += 1;
            else game.analytics.keyStats[key].miss += 1;
        }

        function beginWordTimer() {
            game.currentWordStart = performance.now();
        }

        function recordWordStat(word, durationMs, correct) {
            if (!word) return;
            if (!game.analytics.wordStats[word]) {
                game.analytics.wordStats[word] = { clearCount: 0, failCount: 0, totalMs: 0 };
            }
            const stat = game.analytics.wordStats[word];
            if (correct) {
                stat.clearCount += 1;
                stat.totalMs += Math.max(120, durationMs || 0);
            } else {
                stat.failCount += 1;
            }
        }

        function calculateWeakKeys(limit = 3) {
            return Object.entries(game.analytics.keyStats)
                .map(([key, stat]) => {
                    const total = stat.hit + stat.miss;
                    const missRate = total ? stat.miss / total : 0;
                    return { key, missRate, total };
                })
                .filter((item) => item.total >= 6)
                .sort((a, b) => b.missRate - a.missRate || b.total - a.total)
                .slice(0, limit)
                .map((item) => item.key);
        }

        function calculateSlowWords(limit = 3) {
            return Object.entries(game.analytics.wordStats)
                .filter(([, stat]) => stat.clearCount > 0)
                .map(([word, stat]) => ({
                    word,
                    avgMs: stat.totalMs / stat.clearCount,
                    clearCount: stat.clearCount,
                    failCount: stat.failCount
                }))
                .sort((a, b) => b.avgMs - a.avgMs || b.failCount - a.failCount)
                .slice(0, limit)
                .map((item) => item.word);
        }

        function getRecentAccuracy() {
            if (!game.sessionAttempts.length) return 1;
            const sum = game.sessionAttempts.reduce((acc, value) => acc + (value ? 1 : 0), 0);
            return sum / game.sessionAttempts.length;
        }

        function updateAdaptiveDifficulty() {
            const stage = getStage();
            if (!stage || !game.stageData) return;
            const recentAcc = getRecentAccuracy();
            let targetLevel = 1;
            if (recentAcc >= 0.985 && game.combo >= 22 && game.correctTyped >= 70) targetLevel = 4;
            else if (recentAcc >= 0.95 && game.combo >= 14) targetLevel = 3;
            else if (recentAcc >= 0.88 && game.combo >= 7) targetLevel = 2;
            else if (recentAcc < 0.72) targetLevel = 0;

            if (game.errorStreak >= 3) targetLevel = Math.max(0, targetLevel - 2);
            else if (game.errorStreak >= 2) targetLevel = Math.max(0, targetLevel - 1);

            if (game.profile.assistMode) {
                targetLevel = Math.max(0, targetLevel - 1);
            }

            game.adaptive.level = targetLevel;
            if (targetLevel === 0) {
                game.adaptive.spawnScale = 1.42;
                game.adaptive.bossDrainScale = 0.68;
                game.adaptive.wordDamageScale = 1.28;
            } else if (targetLevel === 1) {
                game.adaptive.spawnScale = 1.1;
                game.adaptive.bossDrainScale = 0.9;
                game.adaptive.wordDamageScale = 1.12;
            } else if (targetLevel === 2) {
                game.adaptive.spawnScale = 0.9;
                game.adaptive.bossDrainScale = 1.05;
                game.adaptive.wordDamageScale = 1;
            } else if (targetLevel === 3) {
                game.adaptive.spawnScale = 0.74;
                game.adaptive.bossDrainScale = 1.22;
                game.adaptive.wordDamageScale = 0.9;
            } else {
                game.adaptive.spawnScale = 0.62;
                game.adaptive.bossDrainScale = 1.34;
                game.adaptive.wordDamageScale = 0.82;
            }

            syncAdaptiveMechanicTuning(stage, game.stageData);
        }

        function getAdaptiveSpawnCap(mechanic) {
            if (mechanic === "homefall") {
                const base = game.adaptive.level >= 4 ? 7 : game.adaptive.level >= 2 ? 6 : 5;
                const errorPenalty = game.errorStreak >= 5 ? 2 : game.errorStreak >= 3 ? 1 : 0;
                return clamp(base - errorPenalty, 4, 7);
            }
            if (mechanic === "bottom_defense") {
                const base = game.adaptive.level >= 4 ? 7 : game.adaptive.level >= 2 ? 6 : 5;
                const errorPenalty = game.errorStreak >= 5 ? 2 : game.errorStreak >= 3 ? 1 : 0;
                return clamp(base - errorPenalty, 4, 7);
            }
            return 1;
        }

        function syncAdaptiveMechanicTuning(stage, data) {
            if (!stage || !data) return;

            if (stage.mechanic === "homefall") {
                const all = data.allKeys || ["a", "s", "d", "f", "j", "k", "l", ";"];
                // Keep stage 1 as full home-row practice; adaptive difficulty changes quantity/speed, not key pool.
                data.allowed = all.slice();
            } else if (stage.mechanic === "bottom_defense") {
                const all = data.allKeys || ["z", "x", "c", "v", "b", "n", "m"];
                // Keep stage 3 as full bottom-row practice; adaptive difficulty changes quantity/speed, not key pool.
                data.allowed = all.slice();
            } else if (stage.mechanic === "top_anchor") {
                const all = data.allTopKeys || ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
                // Keep stage 2 as full top-row practice; adaptive difficulty changes deadline/window only.
                data.topKeys = all.slice();
            }
        }

        function unlockAchievement(id, label) {
            if (game.unlockedAchievements.has(id)) return false;
            game.unlockedAchievements.add(id);
            game.profile.achievements = Array.from(game.unlockedAchievements);
            showCoach(`Mở thành tựu:${label}`, 1400);
            return true;
        }

        function setScene(key) {
            el.bgLayer.style.backgroundImage = `url("${SCENES[key] || SCENES.title}")`;
            const tone = SCENE_TONES[key] || SCENE_TONES.title;
            el.bgLayer.style.filter = `saturate(${tone.sat}) brightness(${tone.bright})`;
            el.bgAurora.style.opacity = String(tone.aura);
        }

        function ensureAudioUnlocked() {
            if (audio.unlocked) return;
            const bootstrap = new Audio();
            bootstrap.volume = 0;
            bootstrap.play().catch(() => {});
            audio.unlocked = true;
        }

        function playBgm(name) {
            if (!audio.unlocked) return;
            if (audio.currentBgm === name) return;
            if (audio.currentBgm && audio.bgm[audio.currentBgm]) {
                audio.bgm[audio.currentBgm].pause();
                audio.bgm[audio.currentBgm].currentTime = 0;
            }
            const track = audio.bgm[name];
            if (!track) return;
            audio.currentBgm = name;
            track.currentTime = 0;
            track.play().catch(() => {});
        }

        function playSfx(name, volume = 0.6) {
            if (!audio.unlocked || !audio.sfx[name]) return;
            const clip = new Audio(audio.sfx[name]);
            clip.volume = clamp(volume, 0, 1);
            clip.play().catch(() => {});
        }

        function setLoadingProgress(done, total, hint = "") {
            if (!el.loadingBarFill || !el.loadingCount || !el.loadingPercent || !el.loadingHint) return;
            const safeTotal = Math.max(1, total || 1);
            const ratio = clamp((done || 0) / safeTotal, 0, 1);
            el.loadingBarFill.style.width = `${Math.round(ratio * 100)}%`;
            el.loadingCount.textContent = `${Math.min(done || 0, safeTotal)} / ${safeTotal}`;
            el.loadingPercent.textContent = `${Math.round(ratio * 100)}%`;
            if (hint) el.loadingHint.textContent = hint;
        }

        function collectPreloadAssetUrls() {
            const html = String(document.documentElement?.outerHTML || "");
            const pattern = /(?:["'(])((?:assets|audio)\/[^"'()\s>]+\.(?:png|jpg|jpeg|gif|webp|mp3|wav|ogg))(?=["')\s>])/gi;
            const urls = new Set();
            let match;
            while ((match = pattern.exec(html))) {
                if (!match[1]) continue;
                urls.add(match[1]);
            }
            return Array.from(urls);
        }

        function preloadImageAsset(url, timeoutMs = 9000) {
            return new Promise((resolve) => {
                const img = new Image();
                let settled = false;
                const done = () => {
                    if (settled) return;
                    settled = true;
                    clearTimeout(timer);
                    img.onload = null;
                    img.onerror = null;
                    resolve();
                };
                const timer = setTimeout(done, timeoutMs);
                img.onload = done;
                img.onerror = done;
                img.decoding = "async";
                img.src = url;
                if (img.complete) done();
            });
        }

        function preloadAudioAsset(url, timeoutMs = 12000) {
            return new Promise((resolve) => {
                const audioProbe = new Audio();
                let settled = false;
                const done = () => {
                    if (settled) return;
                    settled = true;
                    clearTimeout(timer);
                    audioProbe.removeEventListener("canplaythrough", done);
                    audioProbe.removeEventListener("loadeddata", done);
                    audioProbe.removeEventListener("error", done);
                    audioProbe.removeEventListener("stalled", done);
                    audioProbe.removeEventListener("abort", done);
                    resolve();
                };
                const timer = setTimeout(done, timeoutMs);
                audioProbe.preload = "auto";
                audioProbe.addEventListener("canplaythrough", done, { once: true });
                audioProbe.addEventListener("loadeddata", done, { once: true });
                audioProbe.addEventListener("error", done, { once: true });
                audioProbe.addEventListener("stalled", done, { once: true });
                audioProbe.addEventListener("abort", done, { once: true });
                audioProbe.src = url;
                try {
                    audioProbe.load();
                } catch (error) {
                    done();
                }
            });
        }

        function preloadAssetByUrl(url) {
            if (/\.mp3$|\.wav$|\.ogg$/i.test(url)) return preloadAudioAsset(url);
            return preloadImageAsset(url);
        }

        async function runLoadingSequence() {
            const minLoadingMs = 2200;
            const loadingStart = performance.now();
            setLoadingProgress(0, 1, "Đang kiểm tra tài nguyên...");
            let urls = ["/original/art/backgrounds-battle_cave_pixel.svg","/original/art/backgrounds-battle_crypt_pixel.svg","/original/art/backgrounds-battle_forest_pixel.svg","/original/art/backgrounds-battle_frozen_peak_pixel.svg","/original/art/backgrounds-battle_ruins_pixel.svg","/original/art/backgrounds-battle_volcano_pixel.svg","/original/art/backgrounds-inventory_background_pixel.svg","/original/art/backgrounds-main_game_pixel_background.svg","/original/art/backgrounds-shop_background_pixel.svg","/original/art/backgrounds-world_map_pixel.svg","/original/art/character-Injuried-1.svg","/original/art/character-Injuried-2.svg","/original/art/character-Injuried-3.svg","/original/art/character-Injuried-4.svg","/original/art/character-attack-1.svg","/original/art/character-attack-2.svg","/original/art/character-attack-3.svg","/original/art/character-attack-4.svg","/original/art/character-defense-1.svg","/original/art/character-defense-2.svg","/original/art/character-defense-3.svg","/original/art/character-defense-4.svg","/original/art/character-jump-1.svg","/original/art/character-jump-2.svg","/original/art/character-jump-3.svg","/original/art/character-jump-4.svg","/original/art/character-run-1.svg","/original/art/character-run-2.svg","/original/art/character-run-3.svg","/original/art/character-run-4.svg","/original/art/character-stand-1.svg","/original/art/character-stand-1.svg","/original/art/character-stand-2.svg","/original/art/character-stand-3.svg","/original/art/character-stand-4.svg","/original/art/effects-effect_levelup_animation.svg","/original/art/game_logo_title.svg","/original/art/monsters-boar_angry.svg","/original/art/monsters-boar_angry_elite.svg","/original/art/monsters-cave_troll_boss.svg","/original/art/monsters-corrupted_treant.svg","/original/art/monsters-corrupted_treant_elite.svg","/original/art/monsters-crazed_scholar.svg","/original/art/monsters-crazed_scholar_elite.svg","/original/art/monsters-flying_eye.svg","/original/art/monsters-flying_eye_elite.svg","/original/art/monsters-forest_guardian_boss.svg","/original/art/monsters-forest_spirit.svg","/original/art/monsters-forest_spirit_elite.svg","/original/art/monsters-frost_wyrm_boss.svg","/original/art/monsters-ice_spirit.svg","/original/art/monsters-ice_spirit_elite.svg","/original/art/monsters-lava_elemental_boss.svg","/original/art/monsters-lich_apprentice.svg","/original/art/monsters-lich_apprentice_elite.svg","/original/art/monsters-mountain_bandit.svg","/original/art/monsters-mountain_bandit_elite.svg","/original/art/monsters-nether_lord_boss.svg","/original/art/monsters-placeholder_monster.svg","/original/art/monsters-ruins_guardian_boss.svg","/original/art/monsters-shadow_imp.svg","/original/art/monsters-shadow_imp_elite.svg","/original/art/monsters-snakelet_bamboo.svg","/original/art/monsters-stone_golem.svg","/original/art/monsters-stone_golem_elite.svg","/original/art/monsters-undead_warrior.svg","/original/art/monsters-wolf_cub.svg","/original/art/monsters-wolf_cub_elite.svg","/original/art/monsters-yeti.svg","/original/art/pets-kunpeng_icon.svg","/original/art/pets-pet_nether_whelp_icon.svg","/original/art/pets-qinglong_icon.svg","/original/art/pets-zhuque_icon.svg","/original/art/title_background_inkwash.svg","/original/art/ui-button_wood_texture.svg","/original/art/ui-icon_atk_pixel.svg","/original/art/ui-icon_def_pixel.svg","/original/art/ui-icon_hp_pixel.svg","/original/art/ui-icon_mp_pixel.svg","/original/art/ui-icon_scroll_pixel.svg","/original/art/ui-icon_settings_pixel.svg","/original/art/ui-icon_sword_pixel.svg","/original/art/ui-location_thumb_crypt.svg","/original/art/ui-location_thumb_forest.svg","/original/art/ui-location_thumb_frozen_peak.svg","/original/art/ui-location_thumb_ruins.svg","/original/art/ui-location_thumb_volcano.svg","/original/art/ui-portrait.svg","/original/audio/inkstorm-duel.mp3","/original/audio/jade-postroad.mp3","/original/audio/lantern-courtyard.mp3","/original/audio/cue-answer_correct.mp3","/original/audio/cue-answer_wrong.mp3","/original/audio/cue-attack_crit.mp3","/original/audio/cue-battle_lose.mp3","/original/audio/cue-buff_positive.mp3","/original/audio/cue-button_click.mp3","/original/audio/cue-button_hover.mp3","/original/audio/cue-buy_item.mp3","/original/audio/cue-debuff_negative.mp3","/original/audio/cue-fire_effect.mp3","/original/audio/cue-heal_effect.mp3","/original/audio/cue-ice_effect.mp3","/original/audio/cue-level_up.mp3","/original/audio/cue-monster_attack.mp3","/original/audio/cue-player_attack.mp3","/original/audio/cue-poison_tick.mp3","/original/audio/cue-shield_block.mp3","/original/audio/cue-skill_cast.mp3"];
            const total = urls.length || 1;
            let done = 0;
            setLoadingProgress(done, total, `Chuẩn bị tải ${total} tài nguyên...`);

            if (urls.length > 0) {
                const tasks = urls.map((url) => preloadAssetByUrl(url).finally(() => {
                    done += 1;
                    const shortName = url.split("/").slice(-2).join("/");
                    const phaseText = /audio\//i.test(url) ? "Đang tải âm thanh" : "Đang tải hình ảnh";
                    setLoadingProgress(done, total, `${phaseText}: ${shortName}`);
                }));
                await Promise.allSettled(tasks);
            } else {
                done = 1;
                setLoadingProgress(done, total, "Không có tài nguyên cần tải trước.");
            }

            const elapsed = performance.now() - loadingStart;
            if (elapsed < minLoadingMs) {
                setLoadingProgress(done, total, "Đang chuẩn bị chiến trường...");
                await new Promise((resolve) => setTimeout(resolve, minLoadingMs - elapsed));
            }
            setLoadingProgress(total, total, "Đã tải xong. Chuẩn bị vào trò chơi.");
            await new Promise((resolve) => setTimeout(resolve, 220));
        }

        function showToast(message, duration = 1400) {
            el.toast.textContent = message;
            el.toast.classList.add("show");
            clearTimeout(game.toastTimer);
            game.toastTimer = setTimeout(() => el.toast.classList.remove("show"), duration);
        }

        function addScore(delta) {
            if ((!(game.independentStageMode || game.endlessBossMode)) || game.practiceMode) return;
            game.stageScore = Math.max(0, Math.round(game.stageScore + delta));
            if (Math.abs(delta) >= 28 && el.arena) {
                el.arena.classList.remove("fx-good", "fx-bad");
                void el.arena.offsetWidth;
                el.arena.classList.add(delta >= 0 ? "fx-good" : "fx-bad");
            }
            if (delta >= 90 && el.topHud) {
                el.topHud.classList.remove("fx-score");
                void el.topHud.offsetWidth;
                el.topHud.classList.add("fx-score");
            }
        }

        function calcAccuracy() {
            if (game.totalTyped <= 0) return 100;
            return Math.max(0, Math.round((game.correctTyped / game.totalTyped) * 100));
        }

        function splitChars(text) {
            return Array.from(text || "");
        }

        function getTokenText(token) {
            if (token && typeof token === "object") return String(token.text || "");
            return String(token || "");
        }

        function getTokenPhonetic(token) {
            if (token && typeof token === "object") return String(token.phonetic || "");
            return "";
        }

        function getTokenInputText(token) {
            if (token && typeof token === "object") return String(token.input || "");
            return "";
        }

        function getTokenLength(token) {
            return splitChars(getTokenText(token)).length;
        }

        function normalizeChar(char) {
            if (!char) return "";
            const trimmed = char.trim();
            if (!trimmed) return "";
            if (/^[A-Z]$/.test(trimmed)) return trimmed.toLowerCase();
            if (/^[a-z;]$/.test(trimmed)) return trimmed;
            return "";
        }

        function normalizeBopomofoKey(char) {
            if (!char) return "";
            const key = String(char);
            if (key.length !== 1) return "";
            if (/^[A-Z]$/.test(key)) return key.toLowerCase();
            if (/^[a-z0-9,./;\-]$/.test(key)) return key;
            return "";
        }

        function getPhysicalKeyFromCode(code) {
            if (!code) return "";
            if (/^Key[A-Z]$/.test(code)) return code.slice(3).toLowerCase();
            if (/^Digit[0-9]$/.test(code)) return code.slice(5);
            if (code === "Semicolon") return ";";
            if (code === "Comma") return ",";
            if (code === "Period") return ".";
            if (code === "Slash") return "/";
            if (code === "Minus") return "-";
            return "";
        }

        function getGameplayRawKey(event) {
            const byCode = getPhysicalKeyFromCode(event?.code);
            if (byCode) return byCode;
            return event?.key && event.key.length === 1 ? event.key : "";
        }

        function getKeyVisualLabel(key) {
            const stage = getStage();
            if (!game.chineseMode || !stage) {
                return String(key || "").toUpperCase();
            }
            const rowMechanic = stage.mechanic === "homefall" || stage.mechanic === "top_anchor" || stage.mechanic === "bottom_defense";
            if (!rowMechanic) return String(key || "").toUpperCase();
            const mapped = BOPOMOFO_LABEL_BY_KEY[String(key || "").toLowerCase()];
            return mapped || String(key || "").toUpperCase();
        }

        function getKeyPromptLabel(key) {
            const raw = String(key || "").toUpperCase();
            const visual = getKeyVisualLabel(key);
            if (!game.chineseMode) return raw;
            if (!visual || String(visual).toUpperCase() === raw) return raw;
            return `${visual} (${raw})`;
        }

        function tokenToDisplay(token) {
            return getTokenText(token);
        }

        function setCurrentWordToken(data, rawToken) {
            data.currentToken = rawToken;
            data.currentWord = getTokenText(rawToken);
            data.currentPhonetic = getTokenPhonetic(rawToken);
            data.currentInputWord = getTokenInputText(rawToken) || getTokenText(rawToken);
            data.progress = 0;
            if (el.imeInput) el.imeInput.value = "";
            game.imeLastHandledValue = "";
            game.imeLastHandledAt = 0;
            beginWordTimer();
            renderPromptForStage();
        }

        function applyStageVisual(stageId) {
            const visual = STAGE_VISUALS[stageId] || STAGE_VISUALS[1];
            const root = document.documentElement.style;
            root.setProperty("--stage-glow", visual.glow);
            root.setProperty("--stage-spark", visual.spark);
            root.setProperty("--stage-shadow", visual.shadow);
            root.setProperty("--stage-heat", visual.heat);
        }

        function buildAmbientSparks(count = 26) {
            const pieces = [];
            for (let i = 0; i < count; i += 1) {
                const x = `${Math.random() * 100}%`;
                const size = `${4 + Math.random() * 8}px`;
                const dur = `${8 + Math.random() * 9}s`;
                const delay = `${Math.random() * 4}s`;
                const drift = `${(Math.random() - 0.5) * 180}px`;
                pieces.push(`<span class="ambient-spark" style="--x:${x};--size:${size};--dur:${dur};--delay:${delay};--drift:${drift};"></span>`);
            }
            el.arenaAmbient.innerHTML = pieces.join("");
        }

        function triggerFeedbackFlash(strength = 1) {
            clearTimeout(game.feedbackTimer);
            el.feedbackFlash.style.opacity = String(clamp(0.4 + strength * 0.35, 0, 1));
            el.feedbackFlash.classList.add("on");
            game.feedbackTimer = setTimeout(() => {
                el.feedbackFlash.classList.remove("on");
                el.feedbackFlash.style.opacity = "";
            }, 140);
        }

        function triggerArenaShake(power = 1) {
            if (!el.arena) return;
            const heavy = power >= 1.18;
            const cls = heavy ? "shake-heavy" : "shake-light";
            el.arena.classList.remove("shake-light", "shake-heavy");
            void el.arena.offsetWidth;
            el.arena.classList.add(cls);
            clearTimeout(game.arenaShakeTimer);
            game.arenaShakeTimer = setTimeout(() => {
                el.arena.classList.remove("shake-light", "shake-heavy");
            }, heavy ? 360 : 240);
        }

        function pulseHitLine(power = 1) {
            if (!el.hitLine) return;
            el.hitLine.classList.remove("impact");
            el.hitLine.style.borderTopWidth = `${Math.round(clamp(2 + power * 0.8, 2, 4))}px`;
            void el.hitLine.offsetWidth;
            el.hitLine.classList.add("impact");
            clearTimeout(game.hitLineTimer);
            game.hitLineTimer = setTimeout(() => {
                el.hitLine.classList.remove("impact");
                el.hitLine.style.borderTopWidth = "";
            }, 170);
        }

        function isChineseTypingStage() {
            if (!game.chineseMode || game.inputLocale !== "zh") return false;
            if (game.zhModeVariant !== "hanzi") return false;
            const stage = getStage();
            if (!stage || !game.stageData) return false;
            if (game.mode !== "playing") return false;
            if (stage.mechanic === "word_combo") return true;
            if (stage.mechanic === "boss_raid") return !game.stageData.guardMode;
            return false;
        }

        function updateImePanelHint() {
            if (!el.imeHint || !el.imeInput) return;
            const stage = getStage();
            const data = game.stageData;
            if (!isChineseTypingStage() || !stage || !data) {
                el.imeTitle.textContent = game.zhModeVariant === "bopomofo" ? "Chú âm · bấm phím tiếng Anh tương ứng" : "Chữ Hán · chọn chữ bằng bộ gõ";
                el.imeHint.textContent = game.zhModeVariant === "bopomofo"
                    ? "Không cần ô nhập ở chế độ chú âm. Nhìn ký hiệu rồi bấm phím."
                    : "Bật bộ gõ tiếng Trung. Hệ thống chấm sau khi bạn chọn chữ.";
                return;
            }
            el.imeTitle.textContent = "Chữ Hán · chọn chữ bằng bộ gõ";
            const target = getTokenText(data.currentToken || data.currentWord);
            const phonetic = getTokenPhonetic(data.currentToken || data.currentWord);
            const typed = el.imeInput.value || "";
            const stageHintPrefix = stage.mechanic === "boss_raid" ? "Từ của ma vương" : "Mục tiêu";
            if (game.imeComposing && game.imeDraftText) {
                el.imeHint.textContent = `Đang chọn chữ:${game.imeDraftText} ｜ ${stageHintPrefix}Chú âm:${phonetic || "（không có)"}`;
            } else if (typed) {
                el.imeHint.textContent = `Đã nhập:${typed} ｜ ${stageHintPrefix}: ${target}${phonetic ? `（${phonetic}）` : ""}`;
            } else {
                el.imeHint.textContent = `${stageHintPrefix}Chú âm:${phonetic || "（hãy nhập trực tiếp)"}`;
            }
        }

        function syncImeInputVisibility() {
            if (!el.imePanel || !el.imeInput) return;
            const active = isChineseTypingStage();
            el.imePanel.classList.toggle("show", active);
            if (!active) {
                if (document.activeElement === el.imeInput) el.imeInput.blur();
                if (el.imeInput.value && game.mode !== "playing") el.imeInput.value = "";
                game.imeDraftText = "";
                game.imeComposing = false;
                updateImePanelHint();
                return;
            }
            updateImePanelHint();
            if (game.mode === "playing" && document.activeElement !== el.imeInput) {
                try {
                    el.imeInput.focus({ preventScroll: true });
                } catch (error) {
                    el.imeInput.focus();
                }
            }
        }

        function updateHud() {
            const hpRatio = game.playerHp / game.maxPlayerHp;
            const enemyRatio = game.maxEnemyHp ? game.enemyHp / game.maxEnemyHp : 0;
            const qiRatio = game.qi / game.maxQi;

            el.hpFill.style.width = `${Math.round(hpRatio * 100)}%`;
            el.enemyFill.style.width = `${Math.round(enemyRatio * 100)}%`;
            el.qiFill.style.width = `${Math.round(qiRatio * 100)}%`;

            el.hpText.textContent = `${Math.ceil(game.playerHp)}/${game.maxPlayerHp}`;
            el.enemyText.textContent = game.mode === "playing" || game.mode === "dialogue" || game.mode === "transition"
                ? `${Math.ceil(game.enemyHp)}/${game.maxEnemyHp}`
                : "--";
            el.qiText.textContent = `${Math.round(game.qi)}/${game.maxQi}`;

            el.metricAcc.textContent = `${calcAccuracy()}%`;
            el.metricMaxCombo.textContent = game.maxCombo;
            el.metricScoreLabel.textContent = game.endlessBossMode ? "Điểm vô tận" : "Điểm";
            el.metricDefeated.textContent = Math.round(game.stageScore);
            el.metricTyped.textContent = game.totalTyped;
            el.heroWrap.classList.toggle("charged", game.combo >= 10 || game.qi >= 85);
            el.btnPause.style.display = (game.mode === "playing" || game.mode === "paused") ? "inline-block" : "none";
            updateLearningPanel();
            updateStage2QteUI();
            updateBossQteUI();
        }

        function updateStageTrack() {
            Array.from(el.stageTrack.querySelectorAll("[data-stage-node]")).forEach((node) => {
                const idx = Number(node.getAttribute("data-stage-node"));
                node.classList.toggle("active", idx === game.stageIndex && !["title", "stage-select"].includes(game.mode));
                if (game.independentStageMode && !game.practiceMode) {
                    const rec = getStageRecord(idx + 1);
                    node.classList.toggle("done", (rec.bestStars || 0) > 0);
                } else {
                    node.classList.toggle("done", idx < game.stageIndex);
                }
            });
        }

        function setEnemy(monsterId) {
            const info = MONSTERS[monsterId] || MONSTERS.placeholder_monster;
            game.currentMonster = monsterId;
            el.enemyWrap.classList.remove("ending-vanish", "idle-hover", "flicker", "phase-blink");
            game.enemyAmbientFxTimer = 0.45 + Math.random() * 0.8;
            el.enemySprite.src = info.src;
            el.enemySprite.alt = info.name;
            Array.from(el.monsterRail.querySelectorAll("img")).forEach((img) => {
                img.classList.toggle("active", img.getAttribute("data-monster-id") === monsterId);
            });
            if (game.mode === "playing") {
                el.enemyWrap.classList.add("hit");
                setTimeout(() => el.enemyWrap.classList.remove("hit"), 120);
            }
        }

        function triggerEnemyAmbientFx() {
            if (!el.enemyWrap) return;
            if (game.mode !== "playing") return;
            if (el.enemyWrap.classList.contains("ending-vanish")) return;
            const stage = getStage();
            const isBoss = !!stage && stage.mechanic === "boss_raid";
            const roll = Math.random();
            let cls = "idle-hover";
            if (roll > (isBoss ? 0.58 : 0.78)) cls = "phase-blink";
            else if (roll > (isBoss ? 0.28 : 0.52)) cls = "flicker";
            el.enemyWrap.classList.remove("idle-hover", "flicker", "phase-blink");
            void el.enemyWrap.offsetWidth;
            el.enemyWrap.classList.add(cls);
            setTimeout(() => {
                el.enemyWrap.classList.remove(cls);
            }, cls === "idle-hover" ? 1200 : cls === "phase-blink" ? 340 : 240);
        }

        function updateEnemyAmbientFx(dt) {
            if (!el.enemyWrap) return;
            if (!["playing", "dialogue", "transition"].includes(game.mode)) return;
            game.enemyAmbientFxTimer -= dt;
            if (game.enemyAmbientFxTimer > 0) return;
            const stage = getStage();
            const bossBonus = stage?.mechanic === "boss_raid" ? -0.45 : 0;
            game.enemyAmbientFxTimer = 1.15 + Math.random() * 1.55 + bossBonus;
            if (game.enemyAmbientFxTimer < 0.4) game.enemyAmbientFxTimer = 0.4;
            triggerEnemyAmbientFx();
        }

        function rotateEnemyFromPool(pool) {
            if (!pool || pool.length === 0) return;
            const candidate = pick(pool);
            if (candidate !== game.currentMonster || pool.length === 1) {
                setEnemy(candidate);
            }
        }

        function renderMonsterRail(pool) {
            el.monsterRail.innerHTML = pool.map((id) => {
                const info = MONSTERS[id];
                return `<img data-monster-id="${id}" src="${info.src}" alt="${info.name}" title="${info.name}" class="${id === game.currentMonster ? "active" : ""}">`;
            }).join("");
        }

        function setHeroState(state, lockMs = 200) {
            game.heroState = state;
            game.heroStateLockUntil = performance.now() + lockMs;
            if (state === "jump") el.heroWrap.classList.add("jump");
            else el.heroWrap.classList.remove("jump");
            if (state === "Injuried") {
                el.heroWrap.classList.add("hit");
                setTimeout(() => el.heroWrap.classList.remove("hit"), 170);
            }
        }

        function updateHeroAnimation(dtMs) {
            game.heroFrameClock += dtMs;
            const interval = HERO_FRAME_INTERVAL[game.heroState] || 150;
            if (game.heroFrameClock >= interval) {
                game.heroFrameClock = 0;
                game.heroFrame = (game.heroFrame + 1) % 4;
                const frames = HERO_FRAMES[game.heroState] || HERO_FRAMES.stand;
                el.heroSprite.src = frames[game.heroFrame];
            }
            if (game.mode === "playing" && performance.now() > game.heroStateLockUntil && game.heroState !== "stand") {
                game.heroState = "stand";
                el.heroWrap.classList.remove("jump");
            }
        }

        function addFloatMessage(message, x, y, color = "#ffe5a0") {
            const node = document.createElement("div");
            node.className = "float-msg";
            node.textContent = message;
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
            node.style.color = color;
            el.effectLayer.appendChild(node);
            setTimeout(() => node.remove(), 920);
        }

        function getArenaAnchors() {
            const rect = el.arena.getBoundingClientRect();
            return {
                heroX: Math.max(92, rect.width * 0.17),
                heroY: Math.max(170, rect.height - 90),
                enemyX: Math.min(rect.width - 92, rect.width * 0.83),
                enemyY: Math.max(170, rect.height - 98)
            };
        }

        function spawnFx(className, x, y, ttl = 520, customStyle = {}) {
            if (!game.fxPool[className]) game.fxPool[className] = [];
            const node = game.fxPool[className].pop() || document.createElement("div");
            node.className = className;
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
            node.style.cssText = `left:${x}px;top:${y}px;`;
            Object.entries(customStyle).forEach(([key, value]) => node.style.setProperty(key, value));
            el.effectLayer.appendChild(node);
            setTimeout(() => {
                node.remove();
                game.fxPool[className].push(node);
            }, ttl);
        }

        function spawnSlashWave(strength = 1) {
            const pos = getArenaAnchors();
            spawnFx("slash-wave", pos.enemyX - 18, pos.enemyY - 58, 560, {
                width: `${Math.round(170 + strength * 34)}px`,
                opacity: `${clamp(0.68 + strength * 0.2, 0.5, 1)}`
            });
        }

        function spawnJumpBurst() {
            const pos = getArenaAnchors();
            spawnFx("jump-burst", pos.heroX + 34, pos.heroY - 92, 520);
        }

        function spawnDashStreak() {
            const pos = getArenaAnchors();
            spawnFx("dash-streak", pos.heroX + 58, pos.heroY - 28, 420);
        }

        function spawnGuardRing() {
            const pos = getArenaAnchors();
            spawnFx("guard-ring", pos.heroX + 28, pos.heroY - 52, 540);
        }

        function spawnEnemySpark(scale = 1, mode = "normal", target = "enemy") {
            const pos = getArenaAnchors();
            const style = {
                width: `${Math.round(170 * scale)}px`,
                height: `${Math.round(170 * scale)}px`
            };
            if (mode === "damage") {
                style.filter = "hue-rotate(-60deg) saturate(1.2)";
                style.opacity = "0.9";
            }
            const x = target === "hero" ? pos.heroX + 20 : pos.enemyX;
            const y = target === "hero" ? pos.heroY - 46 : pos.enemyY - 12;
            spawnFx("enemy-spark", x, y, 460, style);
        }

        function spawnImpactBurst(power = 1, target = "enemy") {
            const pos = getArenaAnchors();
            const p = clamp(power, 0.7, 2.1);
            const x = target === "hero" ? pos.heroX + 20 : pos.enemyX - 4;
            const y = target === "hero" ? pos.heroY - 46 : pos.enemyY - 44;
            spawnFx("impact-burst", x, y, 360, {
                width: `${Math.round(108 + p * 44)}px`,
                height: `${Math.round(108 + p * 44)}px`,
                opacity: `${clamp(0.75 + p * 0.12, 0.6, 1)}`
            });
            spawnFx("impact-ring", x, y, 440, {
                width: `${Math.round(122 + p * 48)}px`,
                height: `${Math.round(122 + p * 48)}px`,
                opacity: `${clamp(0.72 + p * 0.12, 0.55, 1)}`
            });
        }

        function spawnTeleportRift(x, y, power = 1, warm = false) {
            const p = clamp(power, 0.7, 2);
            spawnFx("teleport-rift", x, y, 340, {
                width: `${Math.round(26 + p * 12)}px`,
                height: `${Math.round(112 + p * 42)}px`,
                background: warm
                    ? "linear-gradient(180deg, rgba(255,215,150,0), rgba(255,215,150,0.96), rgba(255,129,129,0.92), rgba(255,215,150,0))"
                    : "linear-gradient(180deg, rgba(179,255,247,0), rgba(179,255,247,0.95), rgba(255,236,172,0.92), rgba(179,255,247,0))"
            });
        }

        function spawnChargeAura(type = "charge", power = 1) {
            const pos = getArenaAnchors();
            const p = clamp(power, 0.7, 1.9);
            const x = pos.heroX + 28;
            const y = pos.heroY - 58;
            const palette = type === "jump"
                ? {
                    border: "rgba(165, 234, 255, 0.92)",
                    glow: "rgba(129, 222, 255, 0.54)",
                    bg: "radial-gradient(circle, rgba(165, 234, 255, 0.24), rgba(165, 234, 255, 0))",
                    glyph: "rgba(211, 245, 255, 0.95)",
                    hue: "hue-rotate(10deg)"
                }
                : type === "defense"
                    ? {
                        border: "rgba(138, 255, 244, 0.92)",
                        glow: "rgba(91, 245, 236, 0.56)",
                        bg: "radial-gradient(circle, rgba(132, 255, 246, 0.2), rgba(132, 255, 246, 0))",
                        glyph: "rgba(168, 255, 252, 0.95)",
                        hue: "hue-rotate(58deg)"
                    }
                    : type === "attack"
                        ? {
                            border: "rgba(255, 233, 169, 0.92)",
                            glow: "rgba(255, 190, 114, 0.56)",
                            bg: "radial-gradient(circle, rgba(255, 228, 158, 0.22), rgba(255, 228, 158, 0))",
                            glyph: "rgba(255, 243, 194, 0.95)",
                            hue: "hue-rotate(-18deg)"
                        }
                        : {
                            border: "rgba(140, 255, 214, 0.86)",
                            glow: "rgba(140, 255, 214, 0.48)",
                            bg: "radial-gradient(circle, rgba(140, 255, 214, 0.22), rgba(140, 255, 214, 0))",
                            glyph: "rgba(255, 236, 174, 0.92)",
                            hue: "none"
                        };

            spawnFx("charge-aura", x, y, 520, {
                width: `${Math.round(108 + p * 34)}px`,
                height: `${Math.round(108 + p * 34)}px`,
                border: `2px solid ${palette.border}`,
                background: palette.bg,
                "box-shadow": `0 0 ${Math.round(18 + p * 10)}px ${palette.glow}`,
                opacity: `${clamp(0.68 + p * 0.12, 0.6, 1)}`
            });
            spawnFx("charge-glyph", x + (Math.random() * 12 - 6), y - 10, 620, {
                width: `${Math.round(72 + p * 16)}px`,
                height: `${Math.round(72 + p * 16)}px`,
                border: `1px dashed ${palette.glyph}`,
                filter: palette.hue,
                opacity: `${clamp(0.75 + p * 0.12, 0.6, 1)}`
            });
        }

        function triggerTeleportStrike(power = 1, label = "Thuấn trảm") {
            const pos = getArenaAnchors();
            const p = clamp(power, 0.8, 1.9);
            const arenaRect = el.arena.getBoundingClientRect();
            const heroRect = el.heroWrap.getBoundingClientRect();
            const enemyRect = el.enemyWrap.getBoundingClientRect();
            const heroCenterX = (heroRect.left - arenaRect.left) + heroRect.width * 0.5;
            const heroCenterY = (heroRect.top - arenaRect.top) + heroRect.height * 0.58;
            const enemyStrikeX = (enemyRect.left - arenaRect.left) + enemyRect.width * 0.34;
            const enemyStrikeY = (enemyRect.top - arenaRect.top) + enemyRect.height * 0.64;
            const rawDx = enemyStrikeX - heroCenterX;
            const rawDy = enemyStrikeY - heroCenterY;
            const dx = clamp(rawDx, 92, Math.max(160, arenaRect.width - 220));
            const dy = clamp(rawDy * 0.22, -26, 20);
            el.heroWrap.style.setProperty("--tp-dx", `${Math.round(dx)}px`);
            el.heroWrap.style.setProperty("--tp-dy", `${Math.round(dy)}px`);
            el.heroWrap.style.setProperty("--tp-scale", `${(1.03 + p * 0.06).toFixed(2)}`);
            el.heroWrap.classList.remove("teleport-strike");
            void el.heroWrap.offsetWidth;
            el.heroWrap.classList.add("teleport-strike");
            setTimeout(() => el.heroWrap.classList.remove("teleport-strike"), 360);

            spawnTeleportRift(pos.heroX + 26, pos.heroY - 58, p, false);
            spawnTeleportRift(pos.enemyX - 10, pos.enemyY - 54, p * 1.06, true);
            spawnFx("teleport-blink", pos.heroX + 26, pos.heroY - 58, 320, {
                width: `${Math.round(120 + p * 42)}px`,
                height: `${Math.round(120 + p * 42)}px`,
                background: "radial-gradient(circle, rgba(207,255,246,0.56), rgba(102,232,255,0.24), rgba(102,232,255,0))"
            });
            spawnFx("teleport-blink", pos.enemyX - 10, pos.enemyY - 54, 360, {
                width: `${Math.round(128 + p * 56)}px`,
                height: `${Math.round(128 + p * 56)}px`,
                background: "radial-gradient(circle, rgba(255,245,194,0.62), rgba(132,255,226,0.26), rgba(132,255,226,0))"
            });
            spawnFx("dash-streak", (pos.heroX + pos.enemyX) * 0.5, pos.enemyY - 40, 320, {
                width: `${Math.round(160 + p * 70)}px`,
                height: `${Math.round(18 + p * 4)}px`,
                background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(209,255,247,0.92), rgba(255,238,174,0.95), rgba(255,255,255,0))",
                filter: "blur(0.8px)"
            });
            spawnSlashWave(1.1 + p * 0.22);
            spawnEnemySpark(1 + p * 0.18);
            spawnImpactBurst(1 + p * 0.28, "enemy");
            pulseHitLine(1 + p * 0.4);
            triggerArenaShake(0.95 + p * 0.35);
            addFloatMessage(label, pos.enemyX - 34, pos.enemyY - 72, "#fff1bb");
        }

        function showCombo(text) {
            el.comboFloat.textContent = text;
            el.comboFloat.classList.remove("show");
            void el.comboFloat.offsetWidth;
            el.comboFloat.classList.add("show");
        }

        function showStageClearFx() {
            el.stageClearFx.classList.remove("play");
            void el.stageClearFx.offsetWidth;
            el.stageClearFx.classList.add("play");
        }

        function cleanupVictoryScene() {
            el.heroWrap.classList.remove("ending-sheath", "ending-turn", "ending-breath");
            el.enemyWrap.classList.remove("ending-vanish");
            el.victorySkipTip.classList.remove("show");
        }

        function clearVictoryCinematicTimers() {
            if (!game.victoryCinematic || !Array.isArray(game.victoryCinematic.timers)) return;
            game.victoryCinematic.timers.forEach((id) => clearTimeout(id));
            game.victoryCinematic.timers = [];
        }

        function scheduleVictoryCinematic(ms, fn) {
            const id = setTimeout(fn, ms);
            game.victoryCinematic.timers.push(id);
        }

        function recordAttempt(correct) {
            game.totalTyped += 1;
            if (correct) game.correctTyped += 1;
            game.sessionAttempts.push(!!correct);
            if (game.sessionAttempts.length > 30) game.sessionAttempts.shift();
            if (correct) {
                game.errorStreak = 0;
            } else {
                game.errorStreak = Math.min(8, (game.errorStreak || 0) + 1);
                game.stageMisses += 1;
                game.stagePerfect = false;
            }
            updateAdaptiveDifficulty();
        }

        function gainCombo(qiGain = 3) {
            game.combo += 1;
            game.maxCombo = Math.max(game.maxCombo, game.combo);
            game.qi = clamp(game.qi + qiGain, 0, game.maxQi);
            if (game.combo > 0 && game.combo % 15 === 0) {
                playSfx("crit", 0.72);
                playSfx("buff", 0.45);
                showCombo(`Liên kích ${game.combo}！`);
            }
        }

        function breakCombo() {
            game.combo = 0;
        }

        function damageEnemy(amount) {
            if (amount <= 0) return;
            game.enemyHp = Math.max(0, game.enemyHp - amount);
            el.enemyWrap.classList.add("hit");
            setTimeout(() => el.enemyWrap.classList.remove("hit"), 120);
            if (game.enemyHp <= 0) {
                if (isTimedChallengeActive()) {
                    addScore(140 + Math.min(80, game.combo * 4));
                }
                clearCurrentStage();
            }
        }

        function damagePlayer(amount, reason = "") {
            game.playerHp = Math.max(0, game.playerHp - amount);
            if (reason) showToast(reason, 1000);
            if (game.playerHp <= 0) {
                if (game.endlessBossMode) {
                    game.stageMisses += 1;
                    game.stagePerfect = false;
                    game.playerHp = 0;
                    game.mode = "transition";
                    playSfx("lose", 0.78);
                    showCoach("Trận ma vương đã kết thúc. Đang tính điểm.", 900);
                    openResultScreen(true, "endless-defeat");
                    return;
                }
                if (isTimedChallengeActive()) {
                    game.stageMisses += 1;
                    game.stagePerfect = false;
                    addScore(-220);
                    game.playerHp = Math.round(game.maxPlayerHp * 0.72);
                    showCoach("Ngã xuống bị trừ điểm. Đã hồi sinh lực để tiếp tục thử thách.", 980);
                    playSfx("debuff", 0.45);
                    return;
                }
                failStage(reason || "Đã hết sinh lực");
            }
        }

        function triggerHeroLeap() {
            el.heroWrap.classList.remove("leap");
            void el.heroWrap.offsetWidth;
            el.heroWrap.classList.add("leap");
            setTimeout(() => el.heroWrap.classList.remove("leap"), 520);
            spawnChargeAura("jump", 1.08);
            spawnJumpBurst();
            spawnDashStreak();
        }

        function triggerHeroDash() {
            el.heroWrap.classList.remove("dash");
            void el.heroWrap.offsetWidth;
            el.heroWrap.classList.add("dash");
            setTimeout(() => el.heroWrap.classList.remove("dash"), 290);
            spawnChargeAura("attack", 0.86);
            spawnDashStreak();
            pulseHitLine(0.8);
        }

        function triggerGuardBurst() {
            el.heroWrap.classList.add("guard");
            setTimeout(() => el.heroWrap.classList.remove("guard"), 220);
            triggerFeedbackFlash(0.85);
            spawnChargeAura("defense", 1.06);
            spawnGuardRing();
            spawnImpactBurst(0.86, "hero");
            pulseHitLine(0.72);
        }

        function triggerEnemyCast() {
            el.enemyWrap.classList.add("cast");
            setTimeout(() => el.enemyWrap.classList.remove("cast"), 280);
            spawnEnemySpark(0.78);
            const pos = getArenaAnchors();
            spawnTeleportRift(pos.enemyX - 8, pos.enemyY - 52, 0.82, true);
        }

        function softMistake(reason = "Thử lại lần nữa nhé!") {
            breakCombo();
            playSfx("wrong", 0.32);
            addScore(-12);
            showToast(reason, 780);
        }

        function useGraceShield(reason) {
            const data = game.stageData;
            if (!data || typeof data.graceLeft !== "number" || data.graceLeft <= 0) return false;
            data.graceLeft -= 1;
            breakCombo();
            addScore(-8);
            playSfx("shield", 0.46);
            spawnGuardRing();
            showCoach(`Hộ thể thành công:${reason}（còn ${data.graceLeft}）`, 1000);
            showToast(`Hộ thể đã chặn lỗi. Còn ${data.graceLeft}`, 820);
            return true;
        }

        function punishWithProtection({ hpLoss = 2, reason = "", debuff = false, countMistake = true } = {}) {
            if (countMistake) {
                game.stageMisses += 1;
                game.stagePerfect = false;
                game.errorStreak = Math.min(8, (game.errorStreak || 0) + 1);
                updateAdaptiveDifficulty();
            }
            if (useGraceShield(reason || "Giữ nhịp")) return true;
            punishAction({ hpLoss, reason, debuff });
            return false;
        }

        function rewardAction({ enemyDamage = 0, qiGain = 3, hero = "attack", sfx = "correct", message = "", heal = 0.7 } = {}) {
            gainCombo(qiGain);
            addScore(18 + enemyDamage * 9 + Math.min(32, game.combo * 1.3));
            setHeroState(hero, 180);
            playSfx(sfx, 0.62);
            playSfx("playerAttack", 0.45);
            damageEnemy(enemyDamage);
            game.playerHp = Math.min(game.maxPlayerHp, game.playerHp + heal);
            triggerFeedbackFlash(0.95);
            const slashStrength = hero === "attack" ? 1.12 : hero === "run" ? 1 : hero === "defense" ? 0.86 : 0.9;
            spawnSlashWave(slashStrength);
            spawnEnemySpark(1);
            if (enemyDamage > 0) {
                spawnImpactBurst(0.86 + enemyDamage * 0.1, "enemy");
                pulseHitLine(0.88 + enemyDamage * 0.08);
                triggerArenaShake(enemyDamage >= 2 ? 1.08 : 0.92);
            }
            if (hero === "attack") spawnChargeAura("attack", 1.02);
            if (hero === "jump") spawnChargeAura("jump", 1.02);
            if (hero === "defense") spawnChargeAura("defense", 1.08);
            if (hero === "run") triggerHeroDash();
            if (hero === "defense") spawnGuardRing();
            if (enemyDamage >= 2.2 && hero !== "defense" && !/Nổ mây/.test(message || "")) {
                triggerTeleportStrike(0.92 + enemyDamage * 0.1, hero === "run" ? "Thuấn bộ phản kích" : "Thuấn trảm");
            }
            const tag = hero === "jump" ? "Đạp mây" : hero === "defense" ? "Đỡ đòn" : hero === "run" ? "Đỡ đòn" : "Gõ đúng";
            addFloatMessage(tag, 148, 298, "#a5ffd7");
            el.promptMain.classList.add("pulse-good");
            setTimeout(() => el.promptMain.classList.remove("pulse-good"), 220);
            if (message) showCombo(message);
        }

        function punishAction({ hpLoss = 3, reason = "", sfx = "wrong", debuff = false } = {}) {
            breakCombo();
            addScore(-(24 + hpLoss * 6));
            setHeroState("Injuried", 280);
            playSfx(sfx, 0.68);
            playSfx("monsterAttack", 0.48);
            if (debuff) playSfx("debuff", 0.52);
            spawnEnemySpark(0.85, "damage", "hero");
            spawnImpactBurst(0.95 + hpLoss * 0.08, "hero");
            triggerArenaShake(0.96 + hpLoss * 0.1);
            const pos = getArenaAnchors();
            spawnFx("guard-ring", pos.heroX + 22, pos.heroY - 50, 420, {
                border: "3px solid rgba(255, 132, 132, 0.9)",
                background: "radial-gradient(circle, rgba(255, 132, 132, 0.2), rgba(255, 132, 132, 0))"
            });
            damagePlayer(hpLoss, reason);
        }

        function renderPromptForStage() {
            const stage = getStage();
            const data = game.stageData;
            if (!stage || !data) {
                if (el.objectiveGuide) el.objectiveGuide.innerHTML = "";
                return;
            }

            if (el.promptBoard) {
                const compact = stage.mechanic === "homefall" || stage.mechanic === "top_anchor" || stage.mechanic === "bottom_defense";
                el.promptBoard.classList.toggle("compact", compact);
            }
            const promptStageMap = {
                homefall: game.chineseMode ? "Phím căn bản · tụ khí chú âm" : "Phím căn bản · chém phù văn",
                top_anchor: game.chineseMode ? "Đạp mây đỡ đòn · chú âm" : "Đạp mây đỡ đòn · nổ mây phản kích",
                bottom_defense: game.chineseMode ? "Đỡ ám khí · phản kích chú âm" : "Đỡ ám khí · sóng kiếm phản kích",
                word_combo: game.chineseMode ? (game.zhModeVariant === "bopomofo" ? "Phím chú âm · liên chiêu" : "Chọn chữ Hán · nối từ") : "Gõ trọn từ · liên kiếm",
                boss_raid: game.chineseMode ? (game.zhModeVariant === "bopomofo" ? "Ma vương · công thủ bằng chú âm" : "Ma vương · công thủ bằng chữ Hán") : "Ma vương · công thủ"
            };
            const stageLabel = promptStageMap[stage.mechanic] || stage.subtitle || "";
            el.promptStage.textContent = stage.mechanic === "boss_raid"
                ? `${game.endlessBossMode ? "Ma vương · chiến đấu vô tận" : `${stageLabel}${game.bossChallengeMode ? " ｜ Thử thách trường chiến" : ""}`} ｜ Giai đoạn ${data.phase || 1}`
                : stageLabel;
            el.promptSub.textContent = "";
            el.wordProgress.textContent = "";
            el.promptMain.style.fontSize = "";

            if (stage.mechanic === "homefall") {
                el.promptMain.textContent = data.allowed.map((key) => getKeyVisualLabel(key)).join(" ");
            } else if (stage.mechanic === "top_anchor") {
                if (data.expectedType === "anchor") {
                    el.promptMain.textContent = `Đỡ đòn ${getKeyPromptLabel(data.expectedKey)}`;
                } else {
                    el.promptMain.textContent = getKeyPromptLabel(data.expectedKey);
                }
            } else if (stage.mechanic === "bottom_defense") {
                el.promptMain.textContent = (data.allowed || ["z", "x", "c", "v", "b", "n", "m"]).map((key) => getKeyVisualLabel(key)).join(" ");
            } else if (stage.mechanic === "word_combo") {
                el.promptMain.textContent = tokenToDisplay(data.currentWord);
                el.promptMain.style.fontSize = game.chineseMode && getTokenLength(data.currentWord) >= 8
                    ? "clamp(20px, 2.3vw, 34px)"
                    : "";
                const progressHtml = renderWordProgress(data.currentWord, data.progress);
                const phonetic = game.chineseMode ? getTokenPhonetic(data.currentToken || data.currentWord) : "";
                const hintPrefix = game.chineseMode && game.zhModeVariant === "bopomofo" ? "Từ:" : "";
                el.wordProgress.innerHTML = phonetic
                    ? `${progressHtml}<br><span class="phonetic-hint">${hintPrefix}${phonetic}</span>`
                    : progressHtml;
            } else if (stage.mechanic === "boss_raid") {
                if (data.guardMode) {
                    el.promptMain.textContent = `ĐỠ ĐÒN ${data.guardKey.toUpperCase()}`;
                    el.wordProgress.innerHTML = `<span class="current">Thời điểm đỡ đòn</span>`;
                } else {
                    el.promptMain.textContent = tokenToDisplay(data.currentWord);
                    const progressHtml = renderWordProgress(data.currentWord, data.progress);
                    const phonetic = game.chineseMode ? getTokenPhonetic(data.currentToken || data.currentWord) : "";
                    el.wordProgress.innerHTML = phonetic
                        ? `${progressHtml}<br><span class="phonetic-hint">${phonetic}</span>`
                        : progressHtml;
                }
            }

            renderActionGuide(stage, data);
            updateBossQteUI();
        }

        function renderWordProgress(word, progress) {
            return splitChars(word).map((char, index) => {
                if (index < progress) return `<span class="done">${char}</span>`;
                if (index === progress) return `<span class="current">${char}</span>`;
                return `<span>${char}</span>`;
            }).join("");
        }

        function updateObjectiveUI() {
            const stage = getStage();
            const data = game.stageData;
            if (!stage || !data) return;

            el.objectiveMain.textContent = stage.objectiveText || "Nhìn chữ để xuất chiêu, giữ nhịp gõ ổn định.";

            let progressText = "";
            let ratio = 0;

            if (stage.mechanic === "homefall") {
                progressText = `Tụ khí trảm ${data.cleared}/${data.target} ｜ Tích khí ${data.charge}/${data.chargeNeed}`;
                ratio = data.cleared / data.target;
            } else if (stage.mechanic === "top_anchor") {
                progressText = `Nổ mây ${data.burstCount}/${data.targetBurst} ｜ Vân khí ${data.cloudCharge}/${data.cloudNeed}`;
                ratio = data.burstCount / data.targetBurst;
            } else if (stage.mechanic === "bottom_defense") {
                progressText = `Phản kích ${data.counterBursts}/${data.targetBurst} ｜ Khí khiên ${data.shieldCharge}/${data.shieldNeed}`;
                ratio = data.counterBursts / data.targetBurst;
            } else if (stage.mechanic === "word_combo") {
                progressText = game.chineseMode
                    ? `${game.zhModeVariant === "bopomofo" ? "Liên chiêu chú âm" : "Nhập từ phá bùa"}Hoàn thành ${data.completed}/${data.target}`
                    : `Đã phá bùa ${data.completed}/${data.target}`;
                ratio = data.completed / data.target;
            } else if (stage.mechanic === "boss_raid") {
                const guardText = data.guardMode ? `｜Phím đỡ đòn ${data.guardKey.toUpperCase()}` : `｜Đỡ đòn thành công ${data.guardSuccess || 0}`;
                const counterText = data.counterWindow > 0 ? `｜Phản kích ${data.counterWindow.toFixed(1)}s x${(data.counterBonus || 1).toFixed(2)}` : "";
                const pressureText = `｜Áp lực áp sát x${(data.approachPressure || 1).toFixed(2)}`;
                progressText = game.endlessBossMode
                    ? `Ma vương vô tận｜Vòng ${game.stageCycles + 1} ｜ Sinh lực ma vương ${Math.ceil(game.enemyHp)} / ${game.maxEnemyHp} ｜ Giai đoạn ${data.phase || 1}${guardText}${counterText}${pressureText}`
                    : `Sinh lực ma vương:${Math.ceil(game.enemyHp)} / ${game.maxEnemyHp} ｜ Giai đoạn ${data.phase || 1}${game.bossChallengeMode ? " ｜ Thử thách" : ""}${guardText}${counterText}${pressureText}`;
                ratio = 1 - (game.enemyHp / game.maxEnemyHp);
            }

            if (typeof data.graceLeft === "number" && data.graceLeft <= 2) {
                progressText += ` ｜ Hộ thể ${data.graceLeft}`;
            }
            if (isTimedChallengeActive() || game.endlessBossMode) {
                progressText += ` ｜ Điểm ${Math.round(game.stageScore)}`;
            }

            el.objectiveProgress.textContent = progressText;
            if (isTimedChallengeActive()) {
                const timeRatio = game.stageTimerTotal > 0 ? clamp(game.stageTimerLeft / game.stageTimerTotal, 0, 1) : 0;
                el.timerFill.style.width = `${Math.round(timeRatio * 100)}%`;
                el.timerText.textContent = `${Math.max(0, Math.ceil(game.stageTimerLeft))}s`;
            } else {
                if (game.endlessBossMode && stage.mechanic === "boss_raid") {
                    el.timerFill.style.width = `${Math.round(clamp(game.enemyHp / Math.max(1, game.maxEnemyHp), 0, 1) * 100)}%`;
                    el.timerText.textContent = "∞";
                } else {
                    el.timerFill.style.width = `${Math.round(clamp(ratio, 0, 1) * 100)}%`;
                }
                if (stage.mechanic === "boss_raid" && !game.endlessBossMode) {
                    el.timerText.textContent = `${Math.max(0, Math.ceil(data.timeLeft))}s`;
                } else if (!game.endlessBossMode) {
                    el.timerText.textContent = `${Math.round(clamp(ratio, 0, 1) * 100)}%`;
                }
            }
        }

        function renderProjectiles() {
            const stage = getStage();
            const data = game.stageData;
            if (!stage || !data) {
                el.projectileLayer.innerHTML = "";
                return;
            }

            if (stage.mechanic === "homefall") {
                el.projectileLayer.innerHTML = data.objects.map((obj) => `
                    <div class="rune-orb" style="left:${obj.x}px; top:${obj.y}px;">${getKeyVisualLabel(obj.char)}</div>
                `).join("");
            } else if (stage.mechanic === "bottom_defense") {
                el.projectileLayer.innerHTML = data.objects.map((obj) => `
                    <div class="shadow-bolt" style="left:${obj.x}px; top:${obj.y}px;">${getKeyVisualLabel(obj.char)}</div>
                `).join("");
            } else {
                el.projectileLayer.innerHTML = "";
            }
        }

        function getInitialGrace(stage) {
            const base = stage.mechanic === "homefall"
                ? 4
                : stage.mechanic === "top_anchor"
                    ? 4
                    : stage.mechanic === "bottom_defense"
                        ? 4
                        : stage.mechanic === "word_combo"
                            ? 3
                            : 5;
            let bonus = 0;
            if (game.profile.assistMode) bonus += 2;
            if (game.practiceMode) bonus += 1;
            return base + bonus;
        }

        function createStageData(stage) {
            if (stage.mechanic === "homefall") {
                return {
                    objects: [],
                    spawnTimer: 0,
                    runeHits: 0,
                    charge: 0,
                    chargeNeed: 3,
                    cleared: 0,
                    target: stage.target,
                    allKeys: ["a", "s", "d", "f", "j", "k", "l", ";"],
                    allowed: ["a", "s", "d", "f", "j", "k", "l", ";"],
                    uid: 0,
                    graceLeft: getInitialGrace(stage),
                    coachTick: 5.5
                };
            }

            if (stage.mechanic === "top_anchor") {
                return {
                    allTopKeys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                    topKeys: ["q", "w", "e", "r", "t", "y"],
                    expectedType: "top",
                    expectedKey: "q",
                    deadline: 0,
                    deadlineDuration: 0,
                    topSuccess: 0,
                    cloudCharge: 0,
                    cloudNeed: 2,
                    burstCount: 0,
                    targetBurst: stage.target,
                    graceLeft: getInitialGrace(stage),
                    coachTick: 6
                };
            }

            if (stage.mechanic === "bottom_defense") {
                return {
                    objects: [],
                    spawnTimer: 0,
                    blocked: 0,
                    shieldCharge: 0,
                    shieldNeed: 3,
                    counterBursts: 0,
                    targetBurst: stage.target,
                    allKeys: ["z", "x", "c", "v", "b", "n", "m"],
                    allowed: ["z", "x", "c", "v", "b", "n", "m"],
                    uid: 0,
                    graceLeft: getInitialGrace(stage),
                    coachTick: 5.8
                };
            }

            if (stage.mechanic === "word_combo") {
                return {
                    words: game.chineseMode
                        ? (game.zhModeVariant === "bopomofo"
                            ? buildBopomofoModeTokens()
                            : [
                                ...ZH_TYPING_WORD_BANK.easy,
                                ...ZH_TYPING_WORD_BANK.middle,
                                ...ZH_TYPING_WORD_BANK.hard
                            ])
                        : [
                            "cat", "dog", "sun", "moon", "book", "milk", "fish", "bird",
                            "home", "school", "friend", "class", "apple", "water", "happy",
                            "smile", "green", "blue", "plant", "chair", "table", "light",
                            "music", "dance", "jump", "run", "game", "star"
                        ],
                    currentToken: null,
                    currentWord: "",
                    currentPhonetic: "",
                    currentInputWord: "",
                    progress: 0,
                    completed: 0,
                    target: stage.target,
                    graceLeft: getInitialGrace(stage),
                    coachTick: 6.2
                };
            }

            return {
                words: game.chineseMode
                    ? (game.zhModeVariant === "bopomofo"
                        ? buildBopomofoModeTokens()
                        : [
                            ...ZH_TYPING_WORD_BANK.easy,
                            ...ZH_TYPING_WORD_BANK.middle,
                            ...ZH_TYPING_WORD_BANK.hard
                        ])
                    : (game.endlessBossMode
                        ? [
                            ...EN_BOSS_WORD_BANK.easy,
                            ...EN_BOSS_WORD_BANK.middle,
                            ...EN_BOSS_WORD_BANK.junior,
                            ...EN_BOSS_WORD_BANK.senior
                        ]
                        : [
                            "cat", "dog", "sun", "moon", "book", "milk", "fish", "bird",
                            "home", "school", "friend", "class", "apple", "water", "happy",
                            "smile", "green", "blue", "plant", "chair", "table", "light",
                            "music", "dance", "jump", "run", "game", "star", "family",
                            "garden", "planet", "rocket", "purple", "yellow", "winter",
                            "flower", "dragon", "thunder", "volcano", "rainbow"
                        ]),
                currentToken: null,
                currentWord: "",
                currentPhonetic: "",
                currentInputWord: "",
                progress: 0,
                timeLeft: game.endlessBossMode
                    ? Infinity
                    : game.bossChallengeMode
                    ? (game.profile.assistMode ? 300 : 250)
                    : (game.profile.assistMode ? 260 : 220),
                distance: game.bossChallengeMode ? 1.08 : 1.12,
                panicShown: false,
                phase: 1,
                graceLeft: getInitialGrace(stage),
                guardMode: false,
                guardKey: "f",
                guardDeadline: 0,
                guardChargeTimer: getBossGuardCooldown(1),
                guardStartedAt: 0,
                guardDuration: 0,
                qteWarned: false,
                guardSuccess: 0,
                counterWindow: 0,
                counterWindowMax: 0,
                counterBonus: 1,
                missStreak: 0,
                approachPressure: game.endlessBossMode ? 1.08 : 1,
                approachPressureMax: game.endlessBossMode ? 2.45 : (game.bossChallengeMode ? 2.2 : 1.95),
                approachSurgeTimer: 0,
                coachTick: 5
            };
        }

        function stage2NextPrompt() {
            const data = game.stageData;
            if (!data) return;
            syncAdaptiveMechanicTuning(getStage(), data);
            const tighten = game.adaptive.level >= 4 ? 0.62 : game.adaptive.level >= 3 ? 0.74 : game.adaptive.level >= 2 ? 0.86 : 1;
            const safety = game.errorStreak >= 4 ? 1.45 : game.errorStreak >= 3 ? 1.28 : game.errorStreak >= 2 ? 1.14 : 1;
            const windowScale = clamp(game.adaptive.spawnScale * tighten * safety, 0.52, 1.8);
            if (data.expectedType === "top") {
                data.expectedKey = pick(data.topKeys);
                data.deadlineDuration = 3200 * windowScale;
                data.deadline = performance.now() + data.deadlineDuration;
            } else {
                data.expectedKey = Math.random() > 0.5 ? "f" : "j";
                data.deadlineDuration = 2200 * windowScale;
                data.deadline = performance.now() + data.deadlineDuration;
                triggerEnemyCast();
            }
            renderPromptForStage();
        }

        function stage4NextWord() {
            const data = game.stageData;
            let pool = data.words;
            const lenOf = (token) => getTokenLength(token);
            if (game.errorStreak >= 2 || game.adaptive.level === 0) {
                pool = data.words.filter((word) => lenOf(word) <= (game.chineseMode ? 4 : 4));
            } else if (game.adaptive.level >= 4) {
                pool = data.words.filter((word) => lenOf(word) >= (game.chineseMode ? 6 : 5));
            } else if (game.adaptive.level >= 3) {
                pool = data.words.filter((word) => lenOf(word) >= (game.chineseMode ? 4 : 4));
            }
            setCurrentWordToken(data, pick(pool.length ? pool : data.words));
        }

        function stage5NextWord() {
            const data = game.stageData;
            let pool = data.words;
            const lenOf = (token) => getTokenLength(token);
            const phase = data.phase || 1;
            if (game.chineseMode) {
                if (game.endlessBossMode) {
                    const cycle = Math.max(0, game.stageCycles || 0);
                    if (game.errorStreak >= 3) {
                        pool = data.words.filter((word) => lenOf(word) >= 2 && lenOf(word) <= 5);
                    } else if (cycle >= 12) {
                        pool = data.words.filter((word) => lenOf(word) >= 6);
                    } else if (cycle >= 6) {
                        pool = data.words.filter((word) => lenOf(word) >= 4);
                    } else {
                        pool = data.words.filter((word) => lenOf(word) >= 2 && lenOf(word) <= 6);
                    }
                } else if (game.errorStreak >= 2) {
                    pool = data.words.filter((word) => lenOf(word) >= 2 && lenOf(word) <= 4);
                } else if (phase === 1) {
                    pool = data.words.filter((word) => lenOf(word) >= 2 && lenOf(word) <= 5);
                } else if (phase === 2) {
                    pool = data.words.filter((word) => lenOf(word) >= 3 && lenOf(word) <= 7);
                } else {
                    pool = data.words.filter((word) => lenOf(word) >= 4);
                }
            } else if (game.endlessBossMode) {
                const cycle = Math.max(0, game.stageCycles || 0);
                const endlessTier = cycle >= 14 ? 4 : cycle >= 9 ? 3 : cycle >= 4 ? 2 : 1;
                if (game.errorStreak >= 2) {
                    pool = data.words.filter((word) => lenOf(word) >= 4 && lenOf(word) <= 8);
                } else if (endlessTier === 1) {
                    pool = [...EN_BOSS_WORD_BANK.easy, ...EN_BOSS_WORD_BANK.middle.filter((w) => lenOf(w) <= 8)];
                } else if (endlessTier === 2) {
                    pool = [...EN_BOSS_WORD_BANK.middle, ...EN_BOSS_WORD_BANK.junior.filter((w) => lenOf(w) <= 10)];
                } else if (endlessTier === 3) {
                    pool = [...EN_BOSS_WORD_BANK.junior, ...EN_BOSS_WORD_BANK.senior.filter((w) => lenOf(w) <= 13)];
                } else {
                    pool = [...EN_BOSS_WORD_BANK.junior, ...EN_BOSS_WORD_BANK.senior];
                }
            } else if (game.errorStreak >= 2) {
                pool = data.words.filter((word) => lenOf(word) >= 3 && lenOf(word) <= 5);
            } else if (phase === 1) {
                pool = data.words.filter((word) => lenOf(word) >= 3 && lenOf(word) <= 5);
            } else if (phase === 2) {
                pool = data.words.filter((word) => lenOf(word) >= 4 && lenOf(word) <= 6);
            } else {
                pool = data.words.filter((word) => lenOf(word) >= 5);
            }
            if (game.adaptive.level >= 4) {
                pool = pool.filter((word) => lenOf(word) >= 5);
            }
            setCurrentWordToken(data, pick(pool.length ? pool : data.words));
        }

        function getBossGuardCooldown(phase = 1) {
            const challengeScale = game.bossChallengeMode ? 0.95 : 1;
            const endlessScale = game.endlessBossMode ? Math.max(0.72, 1 - Math.min(0.28, (game.stageCycles || 0) * 0.015)) : 1;
            const nextMin = phase === 1 ? 4.8 : phase === 2 ? 3.7 : 2.9;
            const nextMax = phase === 1 ? 7.4 : phase === 2 ? 5.7 : 4.1;
            return (nextMin + Math.random() * Math.max(0.2, nextMax - nextMin)) * challengeScale * endlessScale;
        }

        function resetBossGuardTimer(data) {
            if (!data) return;
            data.guardChargeTimer = getBossGuardCooldown(data.phase || 1);
        }

        function startBossGuardPhase(reason = "Ma vương tụ lực") {
            const stage = getStage();
            if (!stage || stage.mechanic !== "boss_raid") return;
            const data = game.stageData;
            if (!data || data.guardMode) return;
            const phase = data.phase || 1;
            const challengeScale = game.bossChallengeMode ? 0.95 : 1;
            const endlessSpeed = game.endlessBossMode ? Math.max(0.75, 1 - Math.min(0.25, (game.stageCycles || 0) * 0.012)) : 1;
            const deadlineMs = phase === 1 ? 2400 : phase === 2 ? 2050 : 1780;
            const now = performance.now();
            const duration = deadlineMs * challengeScale * endlessSpeed * game.adaptive.spawnScale;
            data.guardMode = true;
            data.guardKey = Math.random() > 0.5 ? "f" : "j";
            data.guardStartedAt = now;
            data.guardDuration = duration;
            data.guardDeadline = now + duration;
            data.qteWarned = false;
            data.counterWindow = 0;
            data.counterWindowMax = 0;
            data.counterBonus = 1;
            data.approachPressure = clamp((data.approachPressure || 1) + 0.08, 0.9, data.approachPressureMax || 2.2);
            data.approachSurgeTimer = Math.max(data.approachSurgeTimer || 0, 0.9);
            triggerEnemyCast();
            triggerFeedbackFlash(0.98);
            spawnEnemySpark(1.15);
            triggerArenaShake(0.98);
            const pos = getArenaAnchors();
            spawnFx("teleport-blink", pos.enemyX - 12, pos.enemyY - 54, 420, {
                width: "176px",
                height: "176px",
                background: "radial-gradient(circle, rgba(255,164,164,0.48), rgba(255,91,120,0.22), rgba(255,91,120,0))"
            });
            spawnFx("charge-glyph", pos.enemyX - 8, pos.enemyY - 64, 720, {
                width: "108px",
                height: "108px",
                border: "1px dashed rgba(255, 210, 186, 0.95)",
                filter: "hue-rotate(-35deg)"
            });
            addFloatMessage(`Đỡ đòn ${data.guardKey.toUpperCase()}`, pos.enemyX - 56, pos.enemyY - 92, "#ffd9c4");
            showCoach(`${reason}！Bấm nhanh ${data.guardKey.toUpperCase()} Đỡ đòn`, 1300);
            renderPromptForStage();
        }

        function playFinalVictoryCinematic(onDone) {
            game.mode = "cinematic";
            game.victoryCinematic.active = true;
            clearVictoryCinematicTimers();
            cleanupVictoryScene();
            el.victorySkipTip.classList.add("show");
            el.bossQtePanel.classList.remove("show", "danger");
            el.counterWindowPanel.classList.remove("show");

            const finish = () => {
                if (!game.victoryCinematic.active) return;
                game.victoryCinematic.active = false;
                clearVictoryCinematicTimers();
                cleanupVictoryScene();
                if (typeof onDone === "function") onDone();
            };
            game.victoryCinematic.finish = finish;

            playSfx("skill", 0.46);
            setHeroState("attack", 280);
            el.heroWrap.classList.add("ending-sheath");
            showCoach("Kiếm khách tra kiếm vào vỏ, quay lưng bước đi.", 1200);

            scheduleVictoryCinematic(360, () => {
                setHeroState("stand", 2500);
                el.heroWrap.classList.remove("ending-sheath");
                el.heroWrap.classList.add("ending-turn");
            });

            scheduleVictoryCinematic(760, () => {
                el.heroWrap.classList.add("ending-breath");
            });

            scheduleVictoryCinematic(980, () => {
                playSfx("debuff", 0.4);
                el.enemyWrap.classList.add("ending-vanish");
                spawnEnemySpark(1.36);
                showToast("Ma vương tan biến...", 1000);
            });

            scheduleVictoryCinematic(2550, finish);
        }

        function showDialogue(lines, onDone) {
            game.mode = "dialogue";
            game.dialogueQueue = [...lines];
            game.dialogueOnDone = onDone || null;
            el.dialoguePanel.classList.add("show");
            syncImeInputVisibility();
            advanceDialogue();
        }

        function advanceDialogue() {
            if (game.dialogueQueue.length === 0) {
                el.dialoguePanel.classList.remove("show");
                const fn = game.dialogueOnDone;
                game.dialogueOnDone = null;
                if (fn) fn();
                return;
            }
            const line = game.dialogueQueue.shift();
            el.dialogueSpeaker.textContent = line.speaker;
            el.dialogueText.textContent = line.text;
        }

        function buildPracticeStage() {
            if (!game.practicePlan) return STAGES[0];
            if (game.practicePlan.type === "keys") {
                const keys = game.practicePlan.keys || ["f", "j", "d"];
                return {
                    ...STAGES[0],
                    name: "Luyện bổ sung · phím còn yếu",
                    subtitle: `Phím cần luyện: ${keys.map((k) => k.toUpperCase()).join(" / ")}`,
                    objectiveText: `Luyện riêng các phím còn yếu:${keys.map((k) => k.toUpperCase()).join("、")}.Tích khí trước, xuất kiếm sau.`,
                    enemyHp: 12,
                    target: 4,
                    baseIndex: 0,
                    opening: [
                        { speaker: "[Hướng dẫn]", text: "Đã mở bài luyện bổ sung. Lượt này tập trung vào các phím bạn hay gõ sai." }
                    ],
                    clear: [
                        { speaker: "[Hướng dẫn]", text: "Hoàn thành luyện các phím còn yếu!" }
                    ]
                };
            }
            const words = game.practicePlan.words || ["school", "friend", "apple"];
            return {
                ...STAGES[3],
                name: "Luyện bổ sung · từ còn yếu",
                subtitle: "Liên chiêu ôn từ",
                objectiveText: `Luyện riêng các từ bạn gõ chậm:${words.join(" / ")}.`,
                enemyHp: 10,
                target: 10,
                baseIndex: 3,
                opening: [
                    { speaker: "[Hướng dẫn]", text: "Đã mở bài ôn từ còn yếu. Gõ đầy đủ từng từ. " }
                ],
                clear: [
                    { speaker: "[Hướng dẫn]", text: "Nhịp nhập từ đã tốt hơn. Bạn có thể quay lại các ải." }
                ]
            };
        }

        function buildChineseModeStage() {
            const isBopomofo = game.zhModeVariant === "bopomofo";
            return {
                ...STAGES[3],
                name: isBopomofo ? "Chế độ chú âm" : "Chế độ chữ Hán",
                subtitle: isBopomofo ? "Liên chiêu bằng phím chú âm" : "Liên chiêu nhập chữ Hán",
                objectiveText: isBopomofo
                    ? "Nhìn ký hiệu chú âm rồi bấm phím tương ứng (ví dụ ㄌ Bấm X）; Gõ đủ mới gây sát thương."
                    : "Dùng bộ gõ tiếng Trung, chọn đúng và nhập đủ cả từ để tấn công.",
                enemyHp: 12,
                target: 12,
                baseIndex: 3,
                opening: [
                    { speaker: "[Hướng dẫn]", text: isBopomofo ? "Đã bật luyện chú âm. Nhìn ký hiệu và bấm phím tương ứng trên bàn phím tiếng Anh." : "Đã vào chế độ chữ Hán. Bật bộ gõ tiếng Trung; hệ thống chấm sau khi bạn chọn xong chữ." },
                    { speaker: "Sư phụ", text: isBopomofo ? "Nhìn ký hiệu chú âm và bấm đúng vị trí phím." : "Lượt này luyện chọn chữ và nhập từ. Cứ chính xác trước, tăng tốc sau." }
                ],
                clear: [
                    { speaker: "[Hướng dẫn]", text: isBopomofo ? "Hoàn thành luyện chú âm! Bạn đã phản xạ đúng phím hơn." : "Hoàn thành luyện chữ Hán! Bạn đã chọn chữ và nhập từ ổn định hơn." }
                ]
            };
        }

        function startStagePreview(onDone) {
            const stage = getStage();
            if (!stage || game.practiceMode) {
                onDone();
                return;
            }
            game.mode = "preview";
            const steps = stage.mechanic === "boss_raid" ? 5 : 4;
            let count = 0;
            showCoach("Đang hướng dẫn: nhìn các biểu tượng phía trên và làm theo ba bước.", 1700);
            const previewTick = () => {
                count += 1;
                if (stage.mechanic === "top_anchor") {
                    if (count <= 2) {
                        triggerHeroLeap();
                        addFloatMessage(`Tụ mây +1`, 210 + count * 28, 236, "#bfe9ff");
                    } else if (count === 3) {
                        triggerEnemyCast();
                        addFloatMessage("Quái vật phản công", 688, 236, "#ffd7d7");
                    } else {
                        triggerGuardBurst();
                        spawnSlashWave(1.2);
                        showCombo("Nổ mây phản kích");
                    }
                } else if (stage.mechanic === "homefall") {
                    if (count < steps) {
                        triggerEnemyCast();
                        addFloatMessage("Tụ khí +1", 320 + Math.random() * 120, 220 + Math.random() * 60, "#c7ffd9");
                    } else {
                        spawnSlashWave(1.22);
                        showCombo("Tụ khí trảm");
                    }
                } else if (stage.mechanic === "bottom_defense") {
                    if (count < steps) {
                        triggerGuardBurst();
                        triggerEnemyCast();
                        addFloatMessage(`Tụ khiên +1`, 280 + count * 26, 242, "#aeeaff");
                    } else {
                        spawnGuardRing();
                        spawnSlashWave(1.18);
                        showCombo("Sóng kiếm phản kích");
                    }
                } else if (stage.mechanic === "word_combo") {
                    triggerHeroDash();
                    spawnSlashWave(1);
                } else if (stage.mechanic === "boss_raid") {
                    triggerEnemyCast();
                    if (count % 2 === 0) triggerGuardBurst();
                    else spawnSlashWave(1.2);
                } else {
                    spawnSlashWave(0.9);
                }
                if (count >= steps) {
                    game.previewTimer = null;
                    onDone();
                    return;
                }
                game.previewTimer = setTimeout(previewTick, 560);
            };
            clearTimeout(game.previewTimer);
            game.previewTimer = setTimeout(previewTick, 400);
        }

        function startStageGameplay() {
            game.mode = "playing";
            if (!game.sessionStart) game.sessionStart = performance.now();
            game.stageStart = performance.now();
            game.stageMisses = 0;
            game.stagePerfect = true;
            game.cycleResetLockUntil = 0;
            if (game.independentStageMode && !game.practiceMode) {
                game.stageTimerTotal = STAGE_CHALLENGE_SECONDS;
                game.stageTimerLeft = STAGE_CHALLENGE_SECONDS;
                game.stageTimerEndAt = performance.now() + STAGE_CHALLENGE_SECONDS * 1000;
                game.timedStageFinished = false;
                game.stageScore = 0;
                game.stageCycles = 0;
            } else {
                game.stageTimerEndAt = 0;
                game.timedStageFinished = false;
            }
            const stage = getStage();
            renderPromptForStage();
            syncImeInputVisibility();
            if (game.endlessBossMode) showToast(`Bắt đầu trận ma vương (${getTypingModeLabel()}・chiến đấu vô tận)`, 900);
            else if (game.chineseMode) showToast(`${getTypingModeLabel()}Bắt đầu (3:00 tính điểm)`, 900);
            else showToast(game.independentStageMode && !game.practiceMode ? "3:00 Bắt đầu thử thách" : "Bắt đầu thử thách", 900);
            if (!stage) return;
            if (stage.mechanic === "homefall") {
                showCoach(game.chineseMode ? "Bước: gõ ký hiệu chú âm -> tích đủ 3 nấc -> tự động xuất kiếm." : "Bước: gõ phù văn -> tích đủ 3 nấc -> tự động xuất kiếm.", 1400);
            } else if (stage.mechanic === "top_anchor") {
                showCoach(game.chineseMode ? "Bước: nhìn ký hiệu để đạp mây -> F/J Đỡ đòn -> nổ mây." : "Bước:Q~P Tụ mây -> F/J Đỡ đòn -> nổ mây.", 1400);
            } else if (stage.mechanic === "bottom_defense") {
                showCoach(game.chineseMode ? "Bước: gõ đúng ký hiệu để đỡ -> Đầy khiên 3 -> tự động phản kích." : "Bước:Z~M Đỡ đòn -> Đầy khiên 3 -> tự động phản kích.", 1400);
            } else if (stage.mechanic === "word_combo") {
                showCoach(
                    game.chineseMode
                        ? (game.zhModeVariant === "bopomofo"
                            ? "Chú âm: nhìn ký hiệu, bấm đúng phím tương ứng để xuất chiêu."
                            : "Chữ Hán: dùng bộ gõ tiếng Trung, chọn xong cả từ để xuất chiêu.")
                        : "Nhìn cả từ và gõ đầy đủ để gây sát thương.",
                    1500
                );
            } else if (stage.mechanic === "boss_raid") {
                showCoach(
                    game.endlessBossMode
                        ? `Chế độ ma vương:${getTypingModeLabel()}Trận chiến vô tận. Ma vương sẽ liên tục áp sát. Khi thấy ĐỠ ĐÒN bấm trước F/J.`
                        : `Boss: ${game.chineseMode ? (game.zhModeVariant === "bopomofo" ? "Gõ đủ chuỗi chú âm" : "Gõ đầy đủ từ") : "Gõ trọn từ"}tấn công, khi thấy ĐỠ ĐÒN bấm trước F/J.`,
                    1500
                );
            }
        }

        function getBaseEnemyHpForStage(stage) {
            if (!stage) return 0;
            const bossChallengeHpScale = game.profile.assistMode ? 1.08 : 1.15;
            return (stage.id === 5 && game.bossChallengeMode && !game.practiceMode)
                ? Math.round(stage.enemyHp * bossChallengeHpScale)
                : stage.enemyHp;
        }

        function getChallengeEnemyHp(stage) {
            const base = getBaseEnemyHpForStage(stage);
            if (game.endlessBossMode && stage?.mechanic === "boss_raid") {
                const cycle = Math.max(0, game.stageCycles || 0);
                const cycleGrowth = 1 + Math.min(2.8, cycle * 0.13);
                const adaptiveGrowth = 1 + Math.max(0, game.adaptive.level - 1) * 0.08;
                return Math.max(1, Math.round(base * cycleGrowth * adaptiveGrowth));
            }
            if (!stage || !(game.independentStageMode && !game.practiceMode)) return base;
            const cycle = Math.max(0, game.stageCycles);
            const cycleGrowth = stage.mechanic === "boss_raid"
                ? 1 + Math.min(0.62, cycle * 0.08)
                : 1 + Math.min(0.7, cycle * 0.1);
            const adaptiveGrowth = 1 + Math.max(0, game.adaptive.level - 1) * (stage.mechanic === "boss_raid" ? 0.06 : 0.08);
            return Math.max(1, Math.round(base * cycleGrowth * adaptiveGrowth));
        }

        function primeStageMechanic(stage) {
            if (!stage || !game.stageData) return;
            if (stage.mechanic === "top_anchor") {
                game.stageData.expectedType = "top";
                stage2NextPrompt();
            }
            if (stage.mechanic === "word_combo") {
                stage4NextWord();
            }
            if (stage.mechanic === "boss_raid") {
                stage5NextWord();
            }
        }

        function resetTimedCycle(stage) {
            if (!stage) return;
            game.stageData = createStageData(stage);
            game.playerHp = Math.min(game.maxPlayerHp, game.playerHp + 6);
            updateAdaptiveDifficulty();
            game.enemyHp = getChallengeEnemyHp(stage);
            game.maxEnemyHp = game.enemyHp;
            if (Array.isArray(stage.enemyPool) && stage.enemyPool.length) {
                const nextMonster = stage.enemyPool[game.stageCycles % stage.enemyPool.length];
                setEnemy(nextMonster);
            }
            primeStageMechanic(stage);
            renderPromptForStage();
            updateObjectiveUI();
            renderProjectiles();
        }

        function resetEndlessBossCycle(stage) {
            if (!stage) return;
            game.stageData = createStageData(stage);
            game.playerHp = Math.min(game.maxPlayerHp, game.playerHp + 10);
            game.qi = Math.min(game.maxQi, game.qi + 14);
            updateAdaptiveDifficulty();
            game.enemyHp = getChallengeEnemyHp(stage);
            game.maxEnemyHp = game.enemyHp;
            if (Array.isArray(stage.enemyPool) && stage.enemyPool.length) {
                const nextMonster = stage.enemyPool[game.stageCycles % stage.enemyPool.length];
                setEnemy(nextMonster);
            }
            primeStageMechanic(stage);
            renderPromptForStage();
            updateObjectiveUI();
            renderProjectiles();
        }

        function loadStage(index, skipOpening = false) {
            const stage = game.practiceMode
                ? buildPracticeStage()
                : STAGES[index];
            if (!stage) return;

            game.currentStageDef = stage;
            game.stageIndex = stage.baseIndex ?? index;
            game.selectedStageIndex = stage.baseIndex ?? index;
            game.stageData = createStageData(stage);
            game.stageTimerEndAt = 0;
            game.timedStageFinished = false;
            if (game.practiceMode && stage.mechanic === "homefall" && game.practicePlan?.keys?.length) {
                game.stageData.allowed = game.practicePlan.keys;
            }
            if (game.practiceMode && stage.mechanic === "word_combo" && game.practicePlan?.words?.length) {
                game.stageData.words = game.practicePlan.words;
            }
            game.playerHp = game.maxPlayerHp;
            game.combo = 0;
            game.qi = Math.min(game.qi, game.maxQi);
            updateAdaptiveDifficulty();
            const enemyHp = getChallengeEnemyHp(stage);
            game.enemyHp = enemyHp;
            game.maxEnemyHp = enemyHp;

            el.stageName.textContent = game.endlessBossMode
                ? `Chế độ ma vương [${getTypingModeLabel()}・Chiến đấu vô tận]`
                : game.chineseMode
                    ? `${stage.id === 5 && game.bossChallengeMode ? `${stage.name}（thử thách)` : stage.name}[${getTypingModeLabel()}]`
                    : stage.id === 5 && game.bossChallengeMode
                        ? `${stage.name}（thử thách)`
                        : stage.name;
            el.arena.setAttribute("data-stage", String(stage.id));
            setScene(stage.scene);
            applyStageVisual(stage.id);
            buildAmbientSparks(stage.id === 5 ? 36 : 26);
            setEnemy(stage.enemyPool[0]);
            renderMonsterRail(stage.enemyPool);
            updateStageTrack();

            if (stage.id === 5) {
                el.bossDistanceWrap.classList.add("active");
            } else {
                el.bossDistanceWrap.classList.remove("active");
            }

            playBgm(stage.bgm);
            playSfx("buy", 0.34);
            if (stage.id === 2) playSfx("ice", 0.45);
            if (stage.id === 5) playSfx("fire", 0.45);

            primeStageMechanic(stage);

            renderPromptForStage();
            updateObjectiveUI();
            renderProjectiles();
            syncImeInputVisibility();

            if (skipOpening) {
                startStageGameplay();
                return;
            }

            showDialogue(stage.opening, () => {
                startStagePreview(() => {
                    startStageGameplay();
                });
            });
        }

        function clearCurrentStage() {
            if (game.mode !== "playing") return;
            const stage = getStage();
            const data = game.stageData;

            if (game.endlessBossMode && stage?.mechanic === "boss_raid") {
                const now = performance.now();
                if (now < (game.cycleResetLockUntil || 0)) return;
                game.cycleResetLockUntil = now + 180;
                game.defeated += 1;
                game.stageCycles += 1;
                const cycleBonus = 420 + Math.min(360, Math.round(game.combo * 12)) + Math.round((game.stageCycles || 0) * 35);
                addScore(cycleBonus);
                playSfx("levelUp", 0.88);
                playSfx("crit", 0.52);
                showStageClearFx();
                triggerArenaShake(1.28);
                showToast(`Ải ${game.stageCycles} vòng đã vượt!+${cycleBonus} điểm`, 950);
                showCoach("Ma vương hồi sinh và mạnh hơn! Tiếp tục chiến đấu.", 900);
                resetEndlessBossCycle(stage);
                return;
            }

            if (isTimedChallengeActive()) {
                if (!stage) return;
                if (!data) {
                    game.stageData = createStageData(stage);
                }
                const left = Math.max(0, (game.stageTimerEndAt - performance.now()) / 1000);
                game.stageTimerLeft = left;
                if (left <= 0.01) {
                    finishTimedStage();
                    return;
                }
                const now = performance.now();
                if (now < (game.cycleResetLockUntil || 0)) return;
                game.cycleResetLockUntil = now + 160;
                game.defeated += 1;
                game.stageCycles += 1;
                const cycleBonus = 220 + Math.round(game.stageTimerLeft * 0.9) + Math.min(220, game.combo * 10);
                addScore(cycleBonus);
                playSfx("levelUp", 0.85);
                playSfx("heal", 0.55);
                showStageClearFx();
                showToast(`Vượt một vòng!+${cycleBonus} điểm (còn ${Math.max(0, Math.ceil(game.stageTimerLeft))} giây)`, 920);
                resetTimedCycle(stage);
                return;
            }

            game.mode = "transition";
            game.defeated += 1;
            playSfx("levelUp", 0.85);
            playSfx("heal", 0.55);
            showStageClearFx();
            showToast(`${stage.name} Vượt ải!`, 1500);

            if (game.practiceMode) {
                showDialogue(stage.clear, () => {
                    openResultScreen(true);
                });
                return;
            }

            showDialogue(stage.clear, () => {
                if (game.stageIndex >= STAGES.length - 1) {
                    playFinalVictoryCinematic(() => {
                        openResultScreen(true);
                    });
                } else {
                    loadStage(game.stageIndex + 1);
                }
            });
        }

        function finishTimedStage() {
            if (game.mode !== "playing") return;
            if (game.timedStageFinished) return;
            game.timedStageFinished = true;
            game.stageTimerLeft = 0;
            if (game.stageTimerEndAt > 0) {
                game.stageTimerEndAt = Math.min(game.stageTimerEndAt, performance.now());
            }
            game.mode = "transition";
            showToast("Hết giờ, đang tính điểm...", 900);
            playSfx("levelUp", 0.62);
            openResultScreen(true, "timer-expired");
        }

        function openResultScreen(force = false, reason = "normal") {
            const timedChallengeResult = game.independentStageMode && !game.practiceMode;
            if (isTimedChallengeActive()) {
                const left = Math.max(0, (game.stageTimerEndAt - performance.now()) / 1000);
                game.stageTimerLeft = left;
                const timerExpired = left <= 0.05 || reason === "timer-expired";
                if (!timerExpired) {
                    showToast("Ải này có 3:00 tính điểm; hết giờ mới tổng kết.", 900);
                    return;
                }
            } else if (timedChallengeResult && game.stageTimerLeft > 0.15 && reason !== "timer-expired") {
                showToast("Ải này có 3:00 tính điểm; hết giờ mới tổng kết.", 900);
                return;
            }
            game.mode = "result";
            game.stageTimerEndAt = 0;
            playBgm("title");
            syncImeInputVisibility();

            const stage = getStage();
            const acc = calcAccuracy();
            const weakKeys = calculateWeakKeys(3);
            const slowWords = calculateSlowWords(3);
            game.lastResultInsights = { weakKeys, slowWords };
            const stageScore = Math.round(game.stageScore);
            const judge = buildJudgeScore(stageScore, acc, game.maxCombo, game.totalTyped);
            const finalScore = judge.total;
            const stageEval = game.practiceMode
                ? { stars: 0, grade: "Luyện tập", pass: true, tiers: [0, 0, 0] }
                : game.endlessBossMode
                    ? evaluateSpecialModeResult("endlessBoss", finalScore, acc, game.maxCombo, game.totalTyped, game.stageCycles)
                    : evaluateStageResult(stage?.id || 1, finalScore, acc, game.maxCombo, game.totalTyped);

            const sessionAchievements = [];
            if (game.maxCombo >= 30) {
                unlockAchievement("combo30", "Liên kích lốc xoáy");
                sessionAchievements.push("Liên kích lốc xoáy");
            }
            if (acc >= 95) {
                unlockAchievement("acc95", "Tấn công đều tay");
                sessionAchievements.push("Tấn công đều tay");
            }
            if (game.totalTyped >= 220) {
                unlockAchievement("typed220", "Tấn công bền bỉ");
                sessionAchievements.push("Tấn công bền bỉ");
            }
            if (game.stagePerfect) {
                unlockAchievement("stage_perfect", "Nhịp gõ không thương tổn");
                sessionAchievements.push("Nhịp gõ không thương tổn");
            }
            if (game.practiceMode) {
                unlockAchievement("practice_done", "Đã luyện bổ sung");
                sessionAchievements.push("Đã luyện bổ sung");
            }
            if (game.bossChallengeMode && !game.practiceMode && !game.endlessBossMode) {
                unlockAchievement("boss_challenge_clear", "Người chinh phục ma vương");
                sessionAchievements.push("Người chinh phục ma vương");
            }
            if (!game.practiceMode && !game.endlessBossMode && stageEval.stars >= 3) {
                unlockAchievement(`stage_${stage?.id}_three_star`, "Vượt ải ba sao");
                sessionAchievements.push("Vượt ải ba sao");
            }

            const weakKeyText = weakKeys.length ? weakKeys.map((k) => k.toUpperCase()).join("、") : "Các phím đang khá đồng đều";
            const slowWordText = slowWords.length ? slowWords.join("、") : (game.chineseMode ? "Nhịp nhập từ đang ổn định" : "Nhịp gõ từ đang ổn định");

            el.resultAcc.textContent = `${acc}%`;
            el.resultMaxCombo.textContent = String(game.maxCombo);
            el.resultScore.textContent = String(finalScore);
            el.resultTyped.textContent = String(game.totalTyped);
            prepareCloudUploadFromResult({ stage, finalScore, acc, stageEval });

            if (stage && timedChallengeResult) {
                const record = getStageRecord(stage.id);
                record.bestScore = Math.max(record.bestScore, finalScore);
                record.bestStars = Math.max(record.bestStars, stageEval.stars);
                record.bestGrade = pickBetterGrade(record.bestGrade, stageEval.grade);
                if (stageEval.pass) record.clearCount += 1;
                record.bestAcc = Math.max(record.bestAcc, acc);
                record.bestCombo = Math.max(record.bestCombo, game.maxCombo);
                record.bestTyped = Math.max(record.bestTyped, game.totalTyped);
                game.profile.stageRecords[String(stage.id)] = record;
            }

            if (!game.practiceMode && game.endlessBossMode) {
                const endlessRecord = getSpecialRecord("endlessBoss");
                endlessRecord.bestScore = Math.max(endlessRecord.bestScore, finalScore);
                endlessRecord.bestStars = Math.max(endlessRecord.bestStars, stageEval.stars);
                endlessRecord.bestGrade = pickBetterGrade(endlessRecord.bestGrade, stageEval.grade);
                endlessRecord.bestAcc = Math.max(endlessRecord.bestAcc, acc);
                endlessRecord.bestCombo = Math.max(endlessRecord.bestCombo, game.maxCombo);
                endlessRecord.bestTyped = Math.max(endlessRecord.bestTyped, game.totalTyped);
                endlessRecord.bestRounds = Math.max(endlessRecord.bestRounds, game.stageCycles);
                endlessRecord.playCount += 1;
                game.profile.specialRecords.endlessBoss = endlessRecord;
            } else if (!game.practiceMode && game.chineseMode && !game.independentStageMode) {
                const zhRecord = getSpecialRecord("zhMode");
                zhRecord.bestScore = Math.max(zhRecord.bestScore, finalScore);
                zhRecord.bestStars = Math.max(zhRecord.bestStars, stageEval.stars);
                zhRecord.bestGrade = pickBetterGrade(zhRecord.bestGrade, stageEval.grade);
                zhRecord.bestAcc = Math.max(zhRecord.bestAcc, acc);
                zhRecord.bestCombo = Math.max(zhRecord.bestCombo, game.maxCombo);
                zhRecord.bestTyped = Math.max(zhRecord.bestTyped, game.totalTyped);
                zhRecord.playCount += 1;
                game.profile.specialRecords.zhMode = zhRecord;
            }

            if (stage) {
                const stageLabel = STAGE_TRACK[(stage.id || 1) - 1]?.name || stage.name || "Ải thử thách";
                el.resultTitle.textContent = game.endlessBossMode
                    ? "Kết quả ma vương"
                    : `Ải ${stage.id} ải có kết quả`;
                el.resultSub.textContent = game.practiceMode
                    ? "Hoàn thành luyện bổ sung. Đã cập nhật nhận xét."
                    : game.endlessBossMode
                        ? `Trận chiến kết thúc ｜ Vòng ${game.stageCycles} ｜ Xếp hạng ${stageEval.grade}`
                        : `${stageEval.pass ? "Vượt ải" : "Chưa vượt ải"} ｜ ${getTypingModeLabel()} ｜ Xếp hạng ${stageEval.grade}`;
                el.resultStageLine.textContent = game.endlessBossMode
                    ? "Chế độ: ma vương vô tận"
                    : `Ải:${stageLabel} ｜ Chế độ:${getTypingModeLongLabel()} ｜ 3:00 Tính điểm`;
                el.resultStars.innerHTML = renderStars(stageEval.stars);
                el.resultScoreLine.textContent = game.practiceMode
                    ? `Nội dung luyện:${game.totalTyped} phím`
                    : game.endlessBossMode
                        ? `Tổng điểm ${finalScore} ｜ Vòng ${game.stageCycles} ｜ Đã hạ ${game.defeated} lượt ma vương`
                        : `Tổng điểm ${finalScore} ｜ Xếp hạng ${stageEval.grade} ｜ ${stageEval.pass ? "Đã vượt ải này" : "Thử lại để giành 1★"}`;
            }

            el.certificate.innerHTML = `
                Chứng nhận:<b>Sứ giả tập sự Đèn Sao</b><br>
                ${game.practiceMode
                    ? "Đã hoàn thành lượt luyện bổ sung."
                    : game.endlessBossMode
                        ? "Trận ma vương vô tận đã kết thúc. Thành tích đã được lưu."
                        : `Đã hoàn thành ải ${stage?.id || 1} · Thử thách 3 phút (${getTypingModeLabel()}）.`}<br>
                Danh hiệu:<b>${game.practiceMode ? "Người rèn nhịp gõ" : stageEval.pass ? "Đệ tử vượt ải" : "Tu sĩ tái chiến"}</b>
                （Xếp hạng:${stageEval.grade}）<br>
                Sư phụ nhận xét:${game.practiceMode
                    ? "Luyện lại điểm còn yếu, bạn sẽ tiến bộ ở lượt sau."
                    : game.endlessBossMode
                        ? "Trận chiến dài cần nhịp gõ ổn định và chuyển đúng lúc giữa tấn công, phòng thủ."
                        : game.chineseMode
                            ? (game.zhModeVariant === "bopomofo"
                                ? (stageEval.pass ? "Bạn đã nhớ phím chú âm. Tiếp theo, thử tăng tốc và nối thêm chiêu." : "Nhớ đúng phím chú âm trước khi tăng tốc.")
                                : (stageEval.pass ? "Bạn đã chọn chữ khá đều tay. Thử nhập cả từ nhanh hơn nhé." : "Chọn chữ đúng trước, tăng tốc sau. Khi đã quen nhịp nhập từ, bạn sẽ gõ nhanh hơn."))
                            : stageEval.pass
                                ? "Nhịp gõ ổn định. Thử lại để giành thêm sao nhé."
                                : "Gõ đúng trước, sau đó tăng tốc và nối chiêu."}
            `;

            el.learningReportText.innerHTML = `
                Lượt này: chính xác <b>${acc}%</b>、Chuỗi dài nhất <b>${game.maxCombo}</b>、Tổng phím <b>${game.totalTyped}</b><br>
                Phím hay gõ sai:<b>${weakKeyText}</b><br>
                ${(game.chineseMode && (stage?.mechanic === "word_combo" || stage?.mechanic === "boss_raid")) ? "Từ có thể nhập nhanh hơn" : "Từ có thể luyện nhanh hơn"}: <b>${slowWordText}</b><br>
                Số lần sai trong ải:<b>${game.stageMisses}</b><br>
                ${game.practiceMode
                    ? "Luyện bổ sung không tính sao. Tập trung vào các phím và từ còn yếu."
                    : stageEval.pass
                        ? "Đã vượt ải. Chơi lại để tăng điểm, sao và hạng."
                        : "Giữ độ chính xác trước, rồi tăng chuỗi đúng và số phím gõ."}
            `;

            el.achievementList.innerHTML = (sessionAchievements.length ? sessionAchievements : ["Hoàn thành ổn định"])
                .map((item) => `<span class="achievement-pill">${item}</span>`)
                .join("");

            game.profile.sessions += 1;
            game.profile.totalKeys += game.totalTyped;
            game.profile.bestAcc = Math.max(game.profile.bestAcc, acc);
            game.profile.bestCombo = Math.max(game.profile.bestCombo, game.maxCombo);
            game.profile.achievements = Array.from(game.unlockedAchievements);
            writeProfile();

            const stageSummary = STAGES.map((item) => {
                const rec = getStageRecord(item.id);
                return `Ải ${item.id}: ${Math.round(rec.bestScore)} điểm (${"★".repeat(rec.bestStars)}${"☆".repeat(3 - rec.bestStars)}）`;
            }).join("<br>");
            const endlessRec = getSpecialRecord("endlessBoss");

            el.growthPanelText.innerHTML = `
                Tổng lượt luyện:<b>${game.profile.sessions}</b><br>
                Tổng phím đã gõ:<b>${game.profile.totalKeys}</b><br>
                Kỷ lục: chính xác <b>${game.profile.bestAcc}%</b> / Liên kích <b>${game.profile.bestCombo}</b><br>
                <br>${stageSummary}<br><br>
                Chế độ ma vương:<b>${Math.round(endlessRec.bestScore)}</b> điểm / Vòng cao nhất <b>${Math.round(endlessRec.bestRounds || 0)}</b> / ${renderStars(endlessRec.bestStars)}<br>
                Nội dung: chú âm / chữ giản thể / chữ phồn thể được lưu điểm và sao riêng cho từng ải; có thể chơi lại
            `;

            if (el.btnPractice) {
                el.btnPractice.textContent = "Luyện bổ sung";
                el.btnPractice.style.display = (game.practiceMode || game.chineseMode || game.endlessBossMode) ? "none" : "inline-block";
            }

            renderStageSelect();
            el.resultScreen.classList.add("show");
        }

        function closeOverlays() {
            el.titleScreen.classList.remove("show");
            if (el.leaderboardScreen) el.leaderboardScreen.classList.remove("show");
            el.stageSelectScreen.classList.remove("show");
            el.resultScreen.classList.remove("show");
            el.failScreen.classList.remove("show");
            el.pauseScreen.classList.remove("show");
            if (el.stage2QtePanel) el.stage2QtePanel.classList.remove("show", "danger");
            el.bossQtePanel.classList.remove("show", "danger");
            el.counterWindowPanel.classList.remove("show");
            el.arena.classList.remove("shake-light", "shake-heavy");
            if (el.hitLine) {
                el.hitLine.classList.remove("impact");
                el.hitLine.style.borderTopWidth = "";
            }
            cleanupVictoryScene();
        }

        function togglePause(force) {
            const toPause = force === undefined ? game.mode === "playing" : !!force;
            if (toPause) {
                if (game.mode !== "playing") return;
                game.mode = "paused";
                game.pauseStartedAt = performance.now();
                el.pauseScreen.classList.add("show");
                showToast(game.autoPausedByBlur ? "Đổi cửa sổ nên trò chơi đã tạm dừng" : "Đã tạm dừng", 800);
                return;
            }
            if (game.mode !== "paused") return;
            const pausedMs = game.pauseStartedAt ? (performance.now() - game.pauseStartedAt) : 0;
            if (pausedMs > 0) {
                game.sessionStart += pausedMs;
                game.stageStart += pausedMs;
                if (isTimedChallengeActive()) {
                    game.stageTimerEndAt += pausedMs;
                }
                const stage = getStage();
                const data = game.stageData;
                if (stage && data) {
                    if (stage.mechanic === "top_anchor" && data.deadline) {
                        data.deadline += pausedMs;
                    }
                    if (stage.mechanic === "boss_raid") {
                        if (data.guardDeadline) data.guardDeadline += pausedMs;
                        if (data.guardStartedAt) data.guardStartedAt += pausedMs;
                    }
                }
            }
            game.pauseStartedAt = 0;
            el.pauseScreen.classList.remove("show");
            game.mode = "playing";
            game.autoPausedByBlur = false;
            showToast("Tiếp tục chiến đấu", 700);
        }

        function failStage(reason) {
            if (game.mode === "failed" || game.mode === "result") return;
            game.mode = "failed";
            playSfx("lose", 0.84);
            playBgm("title");
            syncImeInputVisibility();
            el.failReason.textContent = reason;
            el.failScreen.classList.add("show");
        }

        function resetRun(fullReset = true) {
            game.playerHp = 140;
            game.maxPlayerHp = 140;
            game.combo = 0;
            game.maxCombo = 0;
            game.qi = 0;
            game.defeated = 0;
            game.stageTimerTotal = STAGE_CHALLENGE_SECONDS;
            game.stageTimerLeft = STAGE_CHALLENGE_SECONDS;
            game.stageTimerEndAt = 0;
            game.timedStageFinished = false;
            game.stageScore = 0;
            game.stageCycles = 0;
            game.errorStreak = 0;
            game.cycleResetLockUntil = 0;
            game.totalTyped = 0;
            game.correctTyped = 0;
            game.sessionStart = 0;
            game.sessionAttempts = [];
            game.stageMisses = 0;
            game.stagePerfect = true;
            game.currentStageDef = null;
            game.stageIndex = 0;
            game.selectedStageIndex = 0;
            game.practiceMode = false;
            game.practicePlan = null;
            game.bossChallengeMode = false;
            game.endlessBossMode = false;
            game.chineseMode = false;
            game.zhModeVariant = "hanzi";
            game.inputLocale = "en";
            game.imeComposing = false;
            game.imeDraftText = "";
            game.imeLastHandledValue = "";
            game.imeLastHandledAt = 0;
            game.enemyAmbientFxTimer = 1.1;
            game.independentStageMode = true;
            game.cloud.pendingUpload = null;
            game.cloud.uploading = false;
            game.autoPausedByBlur = false;
            game.pauseStartedAt = 0;
            game.victoryCinematic.active = false;
            game.victoryCinematic.finish = null;
            game.victoryCinematic.timers = [];
            clearVictoryCinematicTimers();
            clearTimeout(game.coachTimer);
            clearTimeout(game.previewTimer);
            clearTimeout(game.arenaShakeTimer);
            clearTimeout(game.hitLineTimer);
            el.coachStrip.classList.remove("show");
            el.pauseScreen.classList.remove("show");
            el.arena.classList.remove("shake-light", "shake-heavy");
            if (el.hitLine) {
                el.hitLine.classList.remove("impact");
                el.hitLine.style.borderTopWidth = "";
            }
            if (el.imeInput) el.imeInput.value = "";
            cleanupVictoryScene();
            if (fullReset) {
                setScene("title");
                playBgm("title");
            }
            syncImeInputVisibility();
            updateHud();
            updateStageTrack();
        }

        function startPracticeMode() {
            const weakKeys = (game.lastResultInsights?.weakKeys || []).slice(0, 3);
            const slowWords = (game.lastResultInsights?.slowWords || []).slice(0, 4);
            if (weakKeys.length > 0) {
                game.practicePlan = { type: "keys", keys: weakKeys };
            } else {
                game.practicePlan = {
                    type: "words",
                    words: slowWords.length ? slowWords : ["school", "friend", "apple", "green"]
                };
            }
            game.practiceMode = true;
            game.independentStageMode = false;
            game.bossChallengeMode = false;
            game.endlessBossMode = false;
            game.chineseMode = false;
            game.zhModeVariant = "hanzi";
            game.inputLocale = "en";
            showCoach("Bắt đầu luyện bổ sung: chính xác trước, nhanh sau.", 1200);
            loadStage(0);
        }

        function handleHomefallInput(key) {
            const data = game.stageData;
            const acceptKeys = data.allKeys || data.allowed;
            if (!acceptKeys.includes(key)) {
                return;
            }

            const sorted = data.objects
                .map((obj, index) => ({ obj, index }))
                .filter((entry) => entry.obj.char === key)
                .sort((a, b) => b.obj.y - a.obj.y);

            if (sorted.length === 0) {
                recordAttempt(false);
                recordKeyStat(key, false);
                softMistake("Phù văn chưa tới. Hãy nhắm đúng mục tiêu!");
                return;
            }

            const idx = sorted[0].index;
            const obj = data.objects[idx];
            data.objects.splice(idx, 1);
            data.runeHits += 1;
            data.charge += 1;
            spawnChargeAura("charge", 0.88 + (data.charge / Math.max(1, data.chargeNeed)) * 0.28);
            recordAttempt(true);
            recordKeyStat(key, true);
            rewardAction({ enemyDamage: 0, qiGain: 2.2, hero: "attack", sfx: "correct", heal: 0.7 });
            addFloatMessage(`Tụ khí ${data.charge}/${data.chargeNeed}`, obj.x - 22, obj.y - 8, "#ffe5a0");

            if (data.charge >= data.chargeNeed) {
                data.charge = 0;
                data.cleared += 1;
                damageEnemy(3);
                playSfx("skill", 0.56);
                triggerTeleportStrike(1.22, "Tụ khí trảm");
                spawnSlashWave(1.35);
                spawnEnemySpark(1.28);
                showCombo(`Tụ khí trảm ${data.cleared}/${data.target}`);
                addFloatMessage("Tụ khí trảm!", obj.x - 28, obj.y - 30, "#fff1b8");
            }

            if (data.cleared > 0 && data.cleared % 2 === 0) {
                rotateEnemyFromPool(getStage().enemyPool);
            }

            if (data.cleared >= data.target) {
                clearCurrentStage();
            }
        }

        function handleTopAnchorInput(key) {
            const data = game.stageData;
            if (!/^[a-z]$/.test(key)) return;

            if (key === data.expectedKey) {
                recordAttempt(true);
                recordKeyStat(key, true);
                if (data.expectedType === "top") {
                    data.topSuccess += 1;
                    data.cloudCharge = Math.min(data.cloudNeed, data.cloudCharge + 1);
                    spawnChargeAura("jump", 0.92 + (data.cloudCharge / Math.max(1, data.cloudNeed)) * 0.34);
                    rewardAction({ enemyDamage: 0, qiGain: 4.2, hero: "jump", sfx: "correct", heal: 1.1 });
                    triggerHeroLeap();
                    addFloatMessage(`Vân khí ${data.cloudCharge}/${data.cloudNeed}`, 190, 240, "#bfe9ff");
                    showCombo(`Đạp mây ${data.topSuccess}`);
                    if (data.cloudCharge >= data.cloudNeed) {
                        playSfx("buff", 0.4);
                        spawnGuardRing();
                        showCoach("Vân khí đã đầy! Lần đỡ đòn tiếp theo sẽ kích nổ mây.", 860);
                    }
                    data.expectedType = "anchor";
                    stage2NextPrompt();
                    if (data.topSuccess % 4 === 0) {
                        playSfx("skill", 0.48);
                        rotateEnemyFromPool(getStage().enemyPool);
                    }
                } else {
                    const burstReady = data.cloudCharge >= data.cloudNeed;
                    if (burstReady) {
                        data.cloudCharge = 0;
                        data.burstCount += 1;
                    }
                    rewardAction({
                        enemyDamage: burstReady ? 2.4 : 0,
                        qiGain: burstReady ? 7.4 : 5.8,
                        hero: burstReady ? "attack" : "run",
                        sfx: "buff",
                        message: burstReady ? `Nổ mây phản kích ${data.burstCount}/${data.targetBurst}` : "Đỡ đòn thành công",
                        heal: burstReady ? 1.9 : 1.4
                    });
                    if (burstReady) {
                        triggerHeroDash();
                        triggerTeleportStrike(1.25, "Nổ mây");
                        spawnSlashWave(1.34);
                        spawnEnemySpark(1.2);
                        addFloatMessage("Nổ mây!", 220, 220, "#cceeff");
                        if (data.burstCount >= data.targetBurst) {
                            game.enemyHp = 0;
                            clearCurrentStage();
                            return;
                        }
                    }
                    playSfx("heal", 0.3);
                    data.expectedType = "top";
                    stage2NextPrompt();
                }
            } else {
                recordAttempt(false);
                recordKeyStat(key, false);
                if (data.expectedType === "anchor") {
                    punishWithProtection({
                        hpLoss: 1,
                        reason: `Chậm lại. Phím đỡ đòn là ${getKeyPromptLabel(data.expectedKey)}`,
                        countMistake: false
                    });
                } else {
                    softMistake(`Mục tiêu lần này là ${getKeyPromptLabel(data.expectedKey)}, Nhảy lại lần nữa!`);
                }
                data.expectedType = "top";
                stage2NextPrompt();
            }

            renderPromptForStage();
        }

        function handleBottomDefenseInput(key) {
            const data = game.stageData;
            const acceptKeys = data.allKeys || data.allowed;
            if (!acceptKeys.includes(key)) {
                return;
            }

            const sorted = data.objects
                .map((obj, index) => ({ obj, index }))
                .filter((entry) => entry.obj.char === key)
                .sort((a, b) => a.obj.x - b.obj.x);

            if (sorted.length === 0) {
                recordAttempt(false);
                recordKeyStat(key, false);
                softMistake("Nhìn ám khí gần nhất rồi mới xuất chiêu!");
                return;
            }

            const idx = sorted[0].index;
            const obj = data.objects[idx];
            data.objects.splice(idx, 1);
            data.blocked += 1;
            data.shieldCharge = Math.min(data.shieldNeed, data.shieldCharge + 1);
            spawnChargeAura("defense", 0.94 + (data.shieldCharge / Math.max(1, data.shieldNeed)) * 0.28);
            recordAttempt(true);
            recordKeyStat(key, true);
            rewardAction({ enemyDamage: 0, qiGain: 4, hero: "defense", sfx: "shield", heal: 1.0 });
            triggerGuardBurst();
            addFloatMessage(`Khí khiên ${data.shieldCharge}/${data.shieldNeed}`, obj.x + 4, obj.y - 8, "#9be8ff");

            if (data.shieldCharge >= data.shieldNeed) {
                data.shieldCharge = 0;
                data.counterBursts += 1;
                damageEnemy(2.5);
                playSfx("crit", 0.58);
                setHeroState("attack", 210);
                triggerHeroDash();
                triggerTeleportStrike(1.18, "Phản kích");
                spawnGuardRing();
                spawnSlashWave(1.28);
                spawnEnemySpark(1.18);
                showCombo(`Sóng kiếm phản kích ${data.counterBursts}/${data.targetBurst}`);
                addFloatMessage("Phản kích!", obj.x - 32, obj.y - 26, "#bde9ff");
                if (data.counterBursts >= data.targetBurst) {
                    game.enemyHp = 0;
                    clearCurrentStage();
                    return;
                }
            }

            if (data.blocked % 5 === 0) {
                rotateEnemyFromPool(getStage().enemyPool);
            }

        }

        function handleWordComboInput(char) {
            const data = game.stageData;
            const bopomofoMode = game.chineseMode && game.zhModeVariant === "bopomofo";
            const displayChars = splitChars(data.currentWord);
            const inputWord = bopomofoMode ? (data.currentInputWord || "") : data.currentWord;
            const expectedChars = splitChars(inputWord);
            const inputChar = bopomofoMode ? normalizeBopomofoKey(char) : normalizeChar(char);
            if (!(bopomofoMode ? /^[a-z0-9,./;\-]$/.test(inputChar) : /^[a-z]$/.test(inputChar))) return;
            const expected = bopomofoMode ? expectedChars[data.progress] : normalizeChar(expectedChars[data.progress]);

            if (inputChar === expected) {
                recordAttempt(true);
                recordKeyStat(inputChar, true);
                gainCombo(2.6);
                addScore(12 + Math.min(24, game.combo * 1.2));
                setHeroState("attack", 140);
                playSfx("playerAttack", 0.4);
                data.progress += 1;
                triggerFeedbackFlash(0.92);
                spawnChargeAura("attack", 0.84);
                spawnSlashWave(0.76);
                addFloatMessage(bopomofoMode ? (displayChars[data.progress - 1] || char) : char, 420 + Math.random() * 140, 228 + Math.random() * 90, "#8ff0c5");

                if (data.progress >= expectedChars.length) {
                    recordWordStat(data.currentWord, performance.now() - game.currentWordStart, true);
                    addScore(95 + Math.min(120, game.combo * 4));
                    data.completed += 1;
                    damageEnemy(1.1 * game.adaptive.wordDamageScale);
                    playSfx("skill", 0.52);
                    playSfx("correct", 0.44);
                    triggerHeroDash();
                    triggerTeleportStrike(1.12, "Liên chiêu trảm");
                    spawnSlashWave(1.2);
                    spawnEnemySpark(1.18);
                    showCombo(`Liên chiêu kiếm khí ${data.completed}/${data.target}`);
                    stage4NextWord();
                    if (data.completed % 3 === 0) {
                        rotateEnemyFromPool(getStage().enemyPool);
                    }
                    if (data.completed >= data.target) {
                        clearCurrentStage();
                    }
                }
            } else {
                recordAttempt(false);
                recordKeyStat(inputChar, false);
                recordWordStat(data.currentWord, 0, false);
                addScore(-18);
                const hintChar = bopomofoMode ? (displayChars[data.progress] || displayChars[0]) : (expectedChars[data.progress] || expectedChars[0]);
                if (!useGraceShield(`Gợi ý, ký tự tiếp theo: ${hintChar}`)) {
                    data.progress = Math.max(0, data.progress - 1);
                    const retryHintChar = bopomofoMode ? (displayChars[data.progress] || displayChars[0]) : (expectedChars[data.progress] || expectedChars[0]);
                    softMistake(`Gợi ý, ký tự tiếp theo: ${retryHintChar}」`);
                }
            }

            renderPromptForStage();
        }

        function handleChineseWordComboImeInput() {
            if (!game.chineseMode || game.inputLocale !== "zh" || !el.imeInput) return;
            if (game.mode !== "playing") return;
            const stage = getStage();
            const data = game.stageData;
            if (!stage || !data || (stage.mechanic !== "word_combo" && stage.mechanic !== "boss_raid")) return;
            if (stage.mechanic === "boss_raid" && data.guardMode) {
                updateImePanelHint();
                return;
            }

            const target = getTokenText(data.currentToken || data.currentWord).replace(/[\s\u3000]/g, "");
            const typedText = String(el.imeInput.value || "").replace(/[\s\u3000]/g, "");
            const now = performance.now();
            if (typedText && game.imeLastHandledValue === typedText && (now - game.imeLastHandledAt) < 40) {
                updateImePanelHint();
                return;
            }
            game.imeLastHandledValue = typedText;
            game.imeLastHandledAt = now;
            const currentLen = splitChars(typedText).length;

            if (!typedText) {
                data.progress = 0;
                renderPromptForStage();
                updateImePanelHint();
                return;
            }

            if (target.startsWith(typedText)) {
                const prevProgress = data.progress || 0;
                data.progress = Math.min(splitChars(target).length, currentLen);
                if (data.progress > prevProgress) {
                    triggerFeedbackFlash(0.6);
                    spawnChargeAura("charge", 0.78 + data.progress * 0.05);
                    spawnFx("charge-glyph", 470 + Math.random() * 110, 216 + Math.random() * 34, 420, {
                        width: "72px",
                        height: "72px",
                        border: "1px dashed rgba(132, 245, 220, 0.9)"
                    });
                    addFloatMessage("Đã chọn chữ", 430 + Math.random() * 90, 246 + Math.random() * 40, "#bff6ff");
                }

                if (typedText === target) {
                    const charCount = Math.max(1, splitChars(target).length);
                    if (stage.mechanic === "word_combo") {
                        for (let i = 0; i < charCount; i += 1) recordAttempt(true);
                        recordWordStat(data.currentWord, performance.now() - game.currentWordStart, true);
                        gainCombo(2.8 + charCount * 0.35);
                        addScore(80 + charCount * 26 + Math.min(140, game.combo * 3.6));
                        data.completed += 1;
                        setHeroState("attack", 180);
                        damageEnemy((1.2 + charCount * 0.22) * game.adaptive.wordDamageScale);
                        playSfx("correct", 0.58);
                        playSfx("skill", 0.46);
                        triggerTeleportStrike(1 + charCount * 0.08, "Chữ Hán trảm");
                        spawnImpactBurst(0.96 + charCount * 0.08, "enemy");
                        pulseHitLine(0.82 + charCount * 0.06);
                        showCombo(`Liên chiêu chữ Hán ${data.completed}/${data.target}`);
                        el.imeInput.value = "";
                        data.progress = 0;
                        game.imeLastHandledValue = "";
                        stage4NextWord();
                        if (data.completed % 3 === 0) rotateEnemyFromPool(getStage().enemyPool);
                        if (data.completed >= data.target) {
                            clearCurrentStage();
                            return;
                        }
                    } else {
                        const phase = data.phase || 1;
                        const hitScale = phase === 1 ? 1 : phase === 2 ? 0.92 : 0.84;
                        const counterMult = data.counterWindow > 0 ? data.counterBonus : 1;
                        for (let i = 0; i < charCount; i += 1) recordAttempt(true);
                        recordWordStat(data.currentWord, performance.now() - game.currentWordStart, true);
                        data.missStreak = 0;
                        gainCombo(3.3 + charCount * 0.28);
                        addScore(90 + charCount * 22 + counterMult * 18 + Math.min(180, game.combo * 3.8));
                        setHeroState("attack", 190);
                        damageEnemy((18 + charCount * 5 + Math.floor(game.combo * 0.18)) * hitScale * counterMult * game.adaptive.wordDamageScale);
                        if (game.stageData !== data) {
                            el.imeInput.value = "";
                            game.imeLastHandledValue = "";
                            renderPromptForStage();
                            updateObjectiveUI();
                            updateImePanelHint();
                            return;
                        }
                        data.distance = clamp(data.distance + (0.05 + charCount * 0.008), 0, 1.2);
                        data.approachPressure = clamp((data.approachPressure || 1) - (0.05 + charCount * 0.006), 0.88, data.approachPressureMax || 2.2);
                        playSfx("correct", 0.58);
                        playSfx("skill", 0.52);
                        triggerHeroDash();
                        triggerTeleportStrike(1.14 + charCount * 0.06 + (counterMult - 1) * 0.2, counterMult > 1.01 ? "Chữ Hán phản kích" : "Chữ Hán bộc trảm");
                        spawnImpactBurst(1.02 + charCount * 0.08, "enemy");
                        pulseHitLine(0.96 + charCount * 0.08);
                        showCombo(counterMult > 1.01 ? "Chữ Hán phản kích" : "Tấn công bằng chữ Hán");
                        el.imeInput.value = "";
                        data.progress = 0;
                        game.imeLastHandledValue = "";
                        stage5NextWord();
                        rotateEnemyFromPool(getStage().enemyPool);
                    }
                }
            } else {
                if (stage.mechanic === "word_combo") {
                    recordAttempt(false);
                    recordWordStat(data.currentWord, 0, false);
                    addScore(-20);
                    const targetChars = splitChars(target);
                    const tipChar = targetChars[data.progress] || targetChars[0] || "";
                    if (!useGraceShield(`Gợi ý, ký tự tiếp theo: ${tipChar || "Từ mục tiêu"}`)) {
                        data.progress = 0;
                        softMistake(`Chưa đúng chữ, thử lại. Gợi ý:${tipChar || "Nhìn mục tiêu"}`);
                    }
                } else {
                    recordAttempt(false);
                    recordWordStat(data.currentWord, 0, false);
                    addScore(-26);
                    data.missStreak = (data.missStreak || 0) + 1;
                    data.distance = clamp(data.distance - (0.03 + Math.min(0.04, data.missStreak * 0.01)), 0, 1.2);
                    data.approachPressure = clamp((data.approachPressure || 1) + 0.1, 0.9, data.approachPressureMax || 2.2);
                    data.approachSurgeTimer = Math.max(data.approachSurgeTimer || 0, 1.1);
                    const targetChars = splitChars(target);
                    const tipChar = targetChars[data.progress] || targetChars[0] || "";
                    if (data.missStreak <= 1) {
                        useGraceShield(`BossGợi ý từ:${tipChar || "Nhìn mục tiêu"}`);
                    } else if (data.missStreak === 2) {
                        punishWithProtection({ hpLoss: 1, reason: "Chọn sai chữ, ma vương đã tiến gần", debuff: false, countMistake: false });
                    } else {
                        punishWithProtection({ hpLoss: 2, reason: "Chọn sai chữ liên tiếp! Hãy đỡ đòn của ma vương trước", debuff: true, countMistake: false });
                        startBossGuardPhase("Ma vương áp sát");
                    }
                    data.progress = 0;
                }
                el.imeInput.value = "";
                game.imeLastHandledValue = "";
            }

            renderPromptForStage();
            updateObjectiveUI();
            updateImePanelHint();
        }

        function performUltimate() {
            if (game.qi < game.maxQi) {
                showToast("Chưa đủ nội lực để tung tuyệt chiêu", 900);
                return;
            }
            recordAttempt(true);
            game.qi = 0;
            gainCombo(0);
            addScore(220 + Math.min(180, game.combo * 6));
            const data = game.stageData;
            const phase = data?.phase || 1;
            const phaseScale = phase === 1 ? 1 : phase === 2 ? 0.9 : 0.82;
            damageEnemy(102 * phaseScale * game.adaptive.wordDamageScale);
            if (game.stageData !== data) return;
            playSfx("skill", 0.9);
            playSfx("fire", 0.85);
            playSfx("crit", 0.85);
            setHeroState("attack", 360);
            showCombo("Vạn kiếm quy tông!");
            data.distance = clamp(data.distance + 0.35, 0, 1.2);
            if (data && typeof data.approachPressure === "number") {
                data.approachPressure = clamp(data.approachPressure - 0.16, 0.88, data.approachPressureMax || 2.2);
                data.approachSurgeTimer = Math.max(0, (data.approachSurgeTimer || 0) - 0.8);
            }
            triggerFeedbackFlash(1);
            triggerTeleportStrike(1.5, "Vạn kiếm quy tông");
            triggerArenaShake(1.45);
            addFloatMessage("Chém toàn trận", 540, 280, "#ffdca5");
            for (let i = 0; i < 5; i += 1) {
                setTimeout(() => {
                    spawnSlashWave(1.2 + i * 0.1);
                    spawnEnemySpark(1 + i * 0.12);
                    spawnImpactBurst(1.05 + i * 0.1, "enemy");
                    pulseHitLine(1.1 + i * 0.08);
                }, i * 70);
            }
            rotateEnemyFromPool(getStage().enemyPool);
        }

        function handleBossInput(event, char) {
            const data = game.stageData;
            if (!data) return;

            if (event && event.code === "Space") {
                if (data.guardMode) {
                    showCoach("Đỡ đòn trước, tung tuyệt chiêu sau!", 700);
                    return;
                }
                performUltimate();
                renderPromptForStage();
                return;
            }

            const bopomofoBossMode = game.chineseMode && game.zhModeVariant === "bopomofo";
            const hanziBossMode = game.chineseMode && game.zhModeVariant === "hanzi";
            if (hanziBossMode && !data.guardMode) {
                // Hanzi boss typing is handled by the IME input box; keyboard stays reserved for guard/space.
                return;
            }

            const inputChar = bopomofoBossMode ? normalizeBopomofoKey(char) : normalizeChar(char);
            const phase = data.phase || 1;
            const hitScale = phase === 1 ? 1 : phase === 2 ? 0.92 : 0.84;
            const counterMult = data.counterWindow > 0 ? data.counterBonus : 1;

            if (data.guardMode) {
                const guardInput = (() => {
                    if (event?.code === "KeyF") return "f";
                    if (event?.code === "KeyJ") return "j";
                    return normalizeChar(char);
                })();
                if (!/^[a-z]$/.test(guardInput)) return;
                const correctGuard = guardInput === data.guardKey;
                recordAttempt(correctGuard);
                recordKeyStat(guardInput, correctGuard);
                if (correctGuard) {
                    const now = performance.now();
                    const remainMs = Math.max(0, data.guardDeadline - now);
                    const remainRatio = data.guardDuration > 0 ? remainMs / data.guardDuration : 0;
                    let guardLabel = "Đỡ đòn thành công";
                    let counterSeconds = 1.1;
                    let counterBonus = 1.08;
                    if (remainRatio >= 0.55) {
                        guardLabel = "Phòng thủ hoàn hảo";
                        counterSeconds = 1.8;
                        counterBonus = 1.34;
                    } else if (remainRatio >= 0.3) {
                        guardLabel = "Đỡ đòn chính xác";
                        counterSeconds = 1.45;
                        counterBonus = 1.2;
                    }

                    data.guardMode = false;
                    data.guardSuccess += 1;
                    data.missStreak = 0;
                    data.counterWindowMax = counterSeconds;
                    data.counterWindow = counterSeconds;
                    data.counterBonus = counterBonus;
                    resetBossGuardTimer(data);
                    data.approachPressure = clamp((data.approachPressure || 1) - 0.14, 0.88, data.approachPressureMax || 2.2);
                    data.approachSurgeTimer = Math.max(0, (data.approachSurgeTimer || 0) - 0.5);
                    rewardAction({
                        enemyDamage: 8.5 * hitScale * counterBonus * game.adaptive.wordDamageScale,
                        qiGain: 7.2,
                        hero: "defense",
                        sfx: "shield",
                        message: guardLabel,
                        heal: 1.6
                    });
                    if (game.stageData !== data) {
                        renderPromptForStage();
                        return;
                    }
                    triggerGuardBurst();
                    if (counterBonus >= 1.2) {
                        triggerTeleportStrike(1.08 + counterBonus * 0.12, "Phá chiêu");
                    }
                    data.distance = clamp(data.distance + 0.08, 0, 1.2);
                    showCoach(`${guardLabel}！Cơ hội phản kích ${counterSeconds.toFixed(1)} giây`, 900);
                    addFloatMessage(`Phản kích x${counterBonus.toFixed(2)}`, 520, 232, "#baf8ed");
                } else {
                    data.missStreak += 1;
                    data.distance = clamp(data.distance - 0.04, 0, 1.2);
                    data.approachPressure = clamp((data.approachPressure || 1) + 0.18, 0.9, data.approachPressureMax || 2.2);
                    data.approachSurgeTimer = Math.max(data.approachSurgeTimer || 0, 1.15);
                    punishWithProtection({
                        hpLoss: 2,
                        reason: `Phím đỡ đòn là ${data.guardKey.toUpperCase()}, Tập trung thử lại nhé!`,
                        debuff: true,
                        countMistake: false
                    });
                }
                renderPromptForStage();
                return;
            }

            if (!(bopomofoBossMode ? /^[a-z0-9,./;\-]$/.test(inputChar) : /^[a-z]$/.test(inputChar))) return;
            const displayChars = splitChars(data.currentWord);
            const inputWord = bopomofoBossMode ? (data.currentInputWord || "") : data.currentWord;
            const expectedChars = splitChars(inputWord);
            const expected = bopomofoBossMode ? expectedChars[data.progress] : normalizeChar(expectedChars[data.progress]);

            if (inputChar === expected) {
                recordAttempt(true);
                recordKeyStat(inputChar, true);
                data.missStreak = 0;
                gainCombo(3.1);
                addScore(16 + counterMult * 10 + Math.min(28, game.combo * 1.1));
                setHeroState("attack", 130);
                playSfx("correct", 0.54);
                playSfx("playerAttack", 0.48);
                data.progress += 1;
                damageEnemy(3.6 * hitScale * counterMult * game.adaptive.wordDamageScale);
                if (game.stageData !== data) {
                    renderPromptForStage();
                    return;
                }
                data.distance = clamp(data.distance + 0.02, 0, 1.2);
                data.approachPressure = clamp((data.approachPressure || 1) - 0.015, 0.88, data.approachPressureMax || 2.2);
                triggerFeedbackFlash(0.94);
                spawnChargeAura(counterMult > 1.01 ? "attack" : "charge", counterMult > 1.01 ? 1.02 : 0.82);
                spawnSlashWave(0.9);
                if (data.progress % 2 === 0) {
                    spawnEnemySpark(0.86);
                }
                if (counterMult > 1.01) {
                    spawnSlashWave(1.12);
                    addFloatMessage("Phản kích!", 590, 260, "#cffff4");
                }
                if (bopomofoBossMode && displayChars[data.progress - 1]) {
                    addFloatMessage(displayChars[data.progress - 1], 438 + Math.random() * 128, 226 + Math.random() * 84, "#c6fff1");
                }

                if (data.progress >= expectedChars.length) {
                    recordWordStat(data.currentWord, performance.now() - game.currentWordStart, true);
                    addScore(120 * counterMult + Math.min(160, game.combo * 4.5));
                    damageEnemy((27 + Math.floor(game.combo * 0.24)) * hitScale * counterMult * game.adaptive.wordDamageScale);
                    if (game.stageData !== data) {
                        renderPromptForStage();
                        return;
                    }
                    playSfx("crit", 0.7);
                    triggerHeroDash();
                    triggerTeleportStrike(
                        1.24 + (counterMult - 1) * 0.22,
                        counterMult > 1.01
                            ? (bopomofoBossMode ? "Chú âm phản kích bộc trảm" : game.chineseMode ? "Chữ Hán · phản kích bộc trảm" : "Phản kích bộc trảm")
                            : (bopomofoBossMode ? "Chú âm kiếm khí bộc phát" : game.chineseMode ? "Chữ Hán bộc phát" : "Kiếm khí bộc phát")
                    );
                    spawnSlashWave(1.35);
                    spawnEnemySpark(1.28);
                    showCombo(bopomofoBossMode ? "Chú âm kiếm khí bộc phát" : game.chineseMode ? "Chữ Hán bộc phát" : "Kiếm khí bộc phát");
                    data.approachPressure = clamp((data.approachPressure || 1) - (0.08 + Math.min(0.08, counterMult * 0.03)), 0.88, data.approachPressureMax || 2.2);
                    data.progress = 0;
                    stage5NextWord();
                    rotateEnemyFromPool(getStage().enemyPool);
                }
            } else {
                recordAttempt(false);
                recordKeyStat(inputChar, false);
                recordWordStat(data.currentWord, 0, false);
                addScore(-24);
                data.missStreak += 1;
                data.progress = Math.max(0, data.progress - 1);
                data.distance = clamp(data.distance - (0.02 + Math.min(0.03, data.missStreak * 0.008)), 0, 1.2);
                data.approachPressure = clamp((data.approachPressure || 1) + 0.12, 0.9, data.approachPressureMax || 2.2);
                data.approachSurgeTimer = Math.max(data.approachSurgeTimer || 0, 1.05);
                const nextHint = bopomofoBossMode ? (displayChars[data.progress] || displayChars[0]) : (expectedChars[data.progress] || expectedChars[0]);
                if (data.missStreak === 1) {
                    useGraceShield(bopomofoBossMode ? `Giữ nhịp ký hiệu. Tiếp theo là ${nextHint}` : "Chậm lại và giữ nhịp gõ");
                } else if (data.missStreak === 2) {
                    punishWithProtection({
                        hpLoss: 1,
                        reason: bopomofoBossMode ? "Ma vương phản kích! Nhìn ký hiệu chú âm rồi bấm" : "Ma vương phản kích! Nhìn chữ rồi gõ",
                        debuff: false,
                        countMistake: false
                    });
                } else {
                    punishWithProtection({
                        hpLoss: 2,
                        reason: bopomofoBossMode ? "Sai liên tiếp! Đỡ đòn rồi nhìn kỹ ký hiệu để gõ" : "Sai liên tiếp! Đỡ đòn trước rồi tấn công",
                        debuff: true,
                        countMistake: false
                    });
                    startBossGuardPhase("Ma vương áp sát");
                }
            }

            renderPromptForStage();
        }

        function handleInput(event) {
            if (game.mode !== "playing") return;
            const stage = getStage();
            if (!stage) return;
            const imeTypingStage =
                game.chineseMode &&
                game.inputLocale === "zh" &&
                (stage.mechanic === "word_combo" || (stage.mechanic === "boss_raid" && !game.stageData?.guardMode));
            if (imeTypingStage && !(stage.mechanic === "boss_raid" && event.code === "Space")) {
                updateImePanelHint();
                return;
            }
            const rawKey = getGameplayRawKey(event);
            const key = rawKey ? normalizeChar(rawKey) : "";

            if (stage.mechanic === "homefall") {
                handleHomefallInput(key);
            } else if (stage.mechanic === "top_anchor") {
                handleTopAnchorInput(key);
            } else if (stage.mechanic === "bottom_defense") {
                handleBottomDefenseInput(key);
            } else if (stage.mechanic === "word_combo") {
                handleWordComboInput(game.chineseMode && game.zhModeVariant === "bopomofo" ? rawKey : key);
            } else if (stage.mechanic === "boss_raid") {
                handleBossInput(event, game.chineseMode && game.zhModeVariant === "bopomofo" ? rawKey : key);
            }

            updateObjectiveUI();
        }

        function updateHomefall(dt) {
            const data = game.stageData;
            const rect = el.arena.getBoundingClientRect();
            const levelBoost = game.adaptive.level >= 4 ? 0.22 : game.adaptive.level >= 3 ? 0.12 : 0;
            const recoverySlow = game.errorStreak >= 4 ? 0.18 : game.errorStreak >= 3 ? 0.1 : 0;
            const speedFactor = clamp((2.18 - game.adaptive.spawnScale) + levelBoost - recoverySlow, 0.76, 1.55);
            const maxObjects = getAdaptiveSpawnCap("homefall");

            data.spawnTimer -= dt;
            if (data.spawnTimer <= 0) {
                if (data.objects.length < maxObjects) {
                    data.uid += 1;
                    data.objects.push({
                        id: data.uid,
                        char: drawRowTarget(data),
                        x: rect.width - (120 + Math.random() * Math.max(100, rect.width * 0.34)),
                        y: -64,
                        drift: -(38 + Math.random() * 42),
                        speed: (96 + Math.random() * 56) * speedFactor
                    });
                }
                const elapsed = (performance.now() - game.stageStart) / 1000;
                const capPressure = data.objects.length >= maxObjects ? 1.15 : 1;
                const paceBoost = game.adaptive.level >= 4 ? 0.78 : game.adaptive.level >= 3 ? 0.88 : game.adaptive.level >= 2 ? 0.95 : 1;
                const recoveryEase = game.errorStreak >= 4 ? 1.26 : game.errorStreak >= 3 ? 1.14 : 1;
                data.spawnTimer = Math.max(0.34, (1.38 - elapsed * 0.013) * game.adaptive.spawnScale * capPressure * paceBoost * recoveryEase);
            }

            for (let i = data.objects.length - 1; i >= 0; i -= 1) {
                const obj = data.objects[i];
                obj.y += obj.speed * dt;
                obj.x += obj.drift * dt;
                if (obj.y > rect.height - 38) {
                    data.objects.splice(i, 1);
                    punishWithProtection({ hpLoss: 1, reason: "Phù văn đã vỡ! Nhắm phù văn tiếp theo." });
                }
            }
        }

        function updateTopAnchor() {
            const data = game.stageData;
            if (performance.now() > data.deadline) {
                if (data.expectedType === "anchor") {
                    recordAttempt(false);
                    punishWithProtection({
                        hpLoss: 1,
                        reason: "Đỡ đòn chậm một nhịp. Bình tĩnh thử lại",
                        countMistake: false
                    });
                    triggerEnemyCast();
                } else {
                    recordAttempt(false);
                    softMistake("Nhảy chậm rồi, thử nhảy lại!");
                }
                data.expectedType = "top";
                stage2NextPrompt();
                renderPromptForStage();
            }
        }

        function updateBottomDefense(dt) {
            const data = game.stageData;
            const rect = el.arena.getBoundingClientRect();
            const levelBoost = game.adaptive.level >= 4 ? 0.28 : game.adaptive.level >= 3 ? 0.16 : game.adaptive.level >= 2 ? 0.08 : 0;
            const recoverySlow = game.errorStreak >= 4 ? 0.22 : game.errorStreak >= 3 ? 0.12 : 0;
            const speedFactor = clamp((2.14 - game.adaptive.spawnScale) + levelBoost - recoverySlow, 0.78, 1.58);
            const maxObjects = getAdaptiveSpawnCap("bottom_defense");

            data.spawnTimer -= dt;
            if (data.spawnTimer <= 0) {
                if (data.objects.length < maxObjects) {
                    data.uid += 1;
                    data.objects.push({
                        id: data.uid,
                        char: drawRowTarget(data),
                        x: rect.width + 12,
                        y: 168 + Math.random() * Math.max(60, rect.height - 242),
                        speed: (138 + Math.random() * 68) * speedFactor
                    });
                }
                const elapsed = (performance.now() - game.stageStart) / 1000;
                const capPressure = data.objects.length >= maxObjects ? 1.14 : 1;
                const paceBoost = game.adaptive.level >= 4 ? 0.74 : game.adaptive.level >= 3 ? 0.86 : game.adaptive.level >= 2 ? 0.94 : 1;
                const recoveryEase = game.errorStreak >= 4 ? 1.28 : game.errorStreak >= 3 ? 1.16 : 1;
                data.spawnTimer = Math.max(0.3, (1.28 - elapsed * 0.013) * game.adaptive.spawnScale * capPressure * paceBoost * recoveryEase);
            }

            for (let i = data.objects.length - 1; i >= 0; i -= 1) {
                const obj = data.objects[i];
                obj.x -= obj.speed * dt;
                if (obj.x < 126) {
                    data.objects.splice(i, 1);
                    punishWithProtection({ hpLoss: 1, reason: "Ám khí đã lọt qua. Đỡ đợt tiếp theo nhé!" });
                }
            }
        }

        function updateBossRaid(dt) {
            const data = game.stageData;
            const timedChallenge = isTimedChallengeActive();
            const endlessBoss = !!game.endlessBossMode;
            let nextPhase = 1;
            if (timedChallenge) {
                const elapsed = game.stageTimerTotal - game.stageTimerLeft;
                if (elapsed >= 120) nextPhase = 3;
                else if (elapsed >= 60) nextPhase = 2;
            } else if (endlessBoss) {
                const cycle = Math.max(0, game.stageCycles || 0);
                if (cycle >= 10) nextPhase = 3;
                else if (cycle >= 4) nextPhase = 2;
                const hpRatio = game.maxEnemyHp > 0 ? game.enemyHp / game.maxEnemyHp : 1;
                if (hpRatio <= 0.33) nextPhase = Math.max(nextPhase, 3);
                else if (hpRatio <= 0.66) nextPhase = Math.max(nextPhase, 2);
            } else {
                const hpRatio = game.maxEnemyHp > 0 ? game.enemyHp / game.maxEnemyHp : 1;
                if (hpRatio <= 0.66) nextPhase = 2;
                if (hpRatio <= 0.33) nextPhase = 3;
            }
            if (nextPhase !== data.phase) {
                data.phase = nextPhase;
                playSfx("buff", 0.48);
                showCoach(`Ma vương vào Giai đoạn ${data.phase}, Tăng tốc!`, 980);
                data.approachPressure = clamp((data.approachPressure || 1) + 0.08, 0.9, data.approachPressureMax || 2.2);
                data.approachSurgeTimer = Math.max(data.approachSurgeTimer || 0, 0.75);
                stage5NextWord();
            }

            const phaseDrainBoost = data.phase === 1 ? 1 : data.phase === 2 ? 1.18 : 1.36;
            if (timedChallenge) {
                data.timeLeft = game.stageTimerLeft;
            } else if (endlessBoss) {
                data.timeLeft = Infinity;
            } else {
                data.timeLeft -= dt;
            }
            data.approachSurgeTimer = Math.max(0, (data.approachSurgeTimer || 0) - dt);
            const surgeMult = data.approachSurgeTimer > 0 ? (1 + Math.min(0.65, data.approachSurgeTimer * 0.42)) : 1;
            const guardMult = data.guardMode ? 1.22 : 1;
            const missMult = 1 + Math.min(0.28, (data.missStreak || 0) * 0.05);
            const cycleMult = endlessBoss ? (1 + Math.min(0.24, (game.stageCycles || 0) * 0.012)) : 1;
            const basePressure = clamp(data.approachPressure || 1, 0.88, data.approachPressureMax || 2.2);
            data.distance = clamp(
                data.distance - dt * 0.0072 * game.adaptive.bossDrainScale * phaseDrainBoost * basePressure * surgeMult * guardMult * missMult * cycleMult,
                0,
                1.2
            );
            if (!data.guardMode) {
                data.guardChargeTimer -= dt;
            }
            data.coachTick -= dt;

            if (data.counterWindow > 0) {
                data.counterWindow = Math.max(0, data.counterWindow - dt);
                if (data.counterWindow <= 0) {
                    data.counterBonus = 1;
                }
            }

            if (data.coachTick <= 0) {
                data.coachTick = 6.8;
                if (data.guardMode) {
                    showCoach(`Phím đỡ đòn:${data.guardKey.toUpperCase()}, Đỡ trước, đánh sau!`, 820);
                } else {
                    showCoach(`Giai đoạn ${data.phase}: Gõ chính xác rồi tăng tốc.`, 760);
                }
            }

            if (!data.guardMode && data.guardChargeTimer <= 0) {
                startBossGuardPhase("Ma vương phản kích");
            }

            if (data.guardMode) {
                if (!Number.isFinite(data.guardDeadline) || data.guardDeadline <= 0) {
                    data.guardMode = false;
                    resetBossGuardTimer(data);
                } else {
                    const remainMs = data.guardDeadline - performance.now();
                    if (remainMs <= 900 && !data.qteWarned) {
                        data.qteWarned = true;
                        playSfx("debuff", 0.38);
                        showCoach(`QTE Sắp hết giờ! Bấm ngay ${data.guardKey.toUpperCase()}`, 760);
                    }
                }
            }

            if (data.guardMode && performance.now() > data.guardDeadline) {
                data.guardMode = false;
                data.missStreak += 1;
                data.distance = clamp(data.distance - 0.05, 0, 1.2);
                data.approachPressure = clamp((data.approachPressure || 1) + 0.16, 0.9, data.approachPressureMax || 2.2);
                data.approachSurgeTimer = Math.max(data.approachSurgeTimer || 0, 1.25);
                resetBossGuardTimer(data);
                punishWithProtection({ hpLoss: 2, reason: "Đỡ đòn quá chậm, ma vương đánh trúng!", debuff: true });
            }

            if (!data.panicShown && game.enemyHp <= game.maxEnemyHp * 0.2) {
                data.panicShown = true;
                if (timedChallenge) {
                    showCoach("Ma vương đã rối loạn! Giữ nhịp và kết thúc trận đấu.", 1200);
                    addFloatMessage("Ma vương rối loạn!", 608, 210, "#ffd5b3");
                } else {
                    showDialogue([
                        { speaker: "Ma vương một ngón (kinh hãi)", text: "Không thể nào! Mắt ngươi nhìn thẳng mà tay vẫn gõ chính xác! Ngươi đã luyện đến cảnh giới nào vậy?!" }
                    ], () => {
                        game.mode = "playing";
                        syncImeInputVisibility();
                    });
                }
            }

            el.bossDistanceFill.style.width = `${Math.round(clamp(data.distance, 0, 1) * 100)}%`;

            if (!timedChallenge && !endlessBoss && data.timeLeft <= 0) {
                failStage("Hết thời gian, ma vương đã phản công");
            }

            if (data.distance <= 0) {
                if (timedChallenge) {
                    const crushPenalty = Math.min(120, 70 + ((data.phase || 1) * 12));
                    addScore(-crushPenalty);
                    game.stageMisses += 1;
                    game.stagePerfect = false;
                    data.guardMode = false;
                    data.counterWindow = 0;
                    data.counterWindowMax = 0;
                    data.counterBonus = 1;
                    data.distance = 0.78;
                    data.approachPressure = clamp((data.approachPressure || 1) + 0.2, 0.9, data.approachPressureMax || 2.2);
                    data.approachSurgeTimer = Math.max(data.approachSurgeTimer || 0, 1.35);
                    resetBossGuardTimer(data);
                    showCoach("Ma vương áp sát! Đã lùi ra xa. Đỡ đòn trước, tấn công sau.", 980);
                } else {
                    failStage("Ma vương đã áp sát, kiếm trận tan vỡ");
                }
            }
        }

        function updateGameplay(dt) {
            const stage = getStage();
            if (!stage || !game.stageData) return;

            if (isTimedChallengeActive()) {
                game.stageTimerLeft = Math.max(0, (game.stageTimerEndAt - performance.now()) / 1000);
                if (game.stageTimerLeft <= 0) {
                    finishTimedStage();
                    return;
                }
            }

            if (stage.mechanic !== "boss_raid" && typeof game.stageData.coachTick === "number") {
                game.stageData.coachTick -= dt;
                if (game.stageData.coachTick <= 0) {
                    game.stageData.coachTick = 7.2;
                    if (stage.mechanic === "homefall") {
                        showCoach("Gõ phù văn, tích đủ 3 nấc sẽ tự chém.", 800);
                    } else if (stage.mechanic === "top_anchor") {
                        showCoach(`Tích đủ ${game.stageData.cloudNeed} nấc vân khí, rồi F/J đỡ đòn.`, 780);
                    } else if (stage.mechanic === "bottom_defense") {
                        showCoach(`Mỗi lần đỡ 1 đợt để tích khiên, đủ ${game.stageData.shieldNeed} nấc sẽ tự phản kích.`, 780);
                    } else if (stage.mechanic === "word_combo") {
                        showCoach(
                            game.chineseMode
                                ? (game.zhModeVariant === "bopomofo"
                                    ? "Nhìn cả chuỗi chú âm. Gõ đủ các phím tương ứng để tấn công."
                                    : "Dùng bộ gõ chọn đúng cả từ để gây sát thương.")
                                : "Gõ đầy đủ một từ để tấn công.",
                            860
                        );
                    }
                }
            }

            if (stage.mechanic === "homefall") {
                updateHomefall(dt);
            } else if (stage.mechanic === "top_anchor") {
                updateTopAnchor();
            } else if (stage.mechanic === "bottom_defense") {
                updateBottomDefense(dt);
            } else if (stage.mechanic === "boss_raid") {
                updateBossRaid(dt);
            }

            updateObjectiveUI();
            renderProjectiles();
        }

        function loop(now) {
            const dtMs = Math.min(64, now - game.lastTick);
            const dt = dtMs / 1000;
            game.lastTick = now;

            if (game.mode === "playing") {
                updateGameplay(dt);
            }

            updateHeroAnimation(dtMs);
            updateEnemyAmbientFx(dt);
            updateHud();
            syncImeInputVisibility();
            requestAnimationFrame(loop);
        }

        function bindButtons() {
            const buttons = Array.from(document.querySelectorAll("button"));
            buttons.forEach((button) => {
                button.addEventListener("mouseenter", () => {
                    ensureAudioUnlocked();
                    playSfx("hover", 0.24);
                });
                button.addEventListener("click", () => {
                    ensureAudioUnlocked();
                    playSfx("click", 0.55);
                });
            });

            el.dialogueNext.addEventListener("click", () => advanceDialogue());

            el.btnStart.addEventListener("click", () => {
                ensureAudioUnlocked();
                resetRun(true);
                applyTypingMode("en");
                openStageSelectScreen();
            });

            el.btnStage5.addEventListener("click", () => {
                ensureAudioUnlocked();
                beginEndlessBossMode();
            });

            if (el.btnOpenLeaderboard) {
                el.btnOpenLeaderboard.addEventListener("click", () => {
                    ensureAudioUnlocked();
                    openLeaderboardScreen();
                });
            }

            if (el.btnZhMode) {
                el.btnZhMode.addEventListener("click", () => {
                    ensureAudioUnlocked();
                    beginChineseMode("hanzi");
                });
            }

            if (el.btnZhBpmfMode) {
                el.btnZhBpmfMode.addEventListener("click", () => {
                    ensureAudioUnlocked();
                    beginChineseMode("bopomofo");
                });
            }

            if (el.btnCloudSave) {
                el.btnCloudSave.addEventListener("click", () => {
                    saveCloudSettings();
                });
            }

            if (el.btnCloudRefresh) {
                el.btnCloudRefresh.addEventListener("click", async () => {
                    await fetchCloudLeaderboard();
                });
            }

            if (el.btnCloudRefreshResult) {
                el.btnCloudRefreshResult.addEventListener("click", async () => {
                    await fetchCloudLeaderboard();
                });
            }

            if (el.btnLeaderboardRefresh) {
                el.btnLeaderboardRefresh.addEventListener("click", async () => {
                    await fetchCloudLeaderboard();
                });
            }

            if (el.btnLeaderboardBack) {
                el.btnLeaderboardBack.addEventListener("click", () => {
                    closeOverlays();
                    game.mode = "title";
                    setTitleOptionsOpen(false);
                    if (el.titleScreen) el.titleScreen.classList.add("show");
                });
            }

            if (el.btnUploadScore) {
                el.btnUploadScore.addEventListener("click", async () => {
                    await uploadPendingCloudScore();
                });
            }

            [el.cloudPlayerName, el.cloudSheetUrl].forEach((input) => {
                if (!input) return;
                input.addEventListener("keydown", (event) => {
                    if (event.key !== "Enter") return;
                    event.preventDefault();
                    saveCloudSettings();
                });
            });

            if (el.btnModeEn) {
                el.btnModeEn.addEventListener("click", () => {
                    applyTypingMode("en");
                    renderStageSelect();
                    showCoach("Đã chuyển nội dung luyện.", 700);
                });
            }
            if (el.btnModeZhHanzi) {
                el.btnModeZhHanzi.addEventListener("click", () => {
                    applyTypingMode("zh-hanzi");
                    renderStageSelect();
                    showCoach("Đã chuyển sang luyện chữ Hán.", 900);
                });
            }
            if (el.btnModeZhBpmf) {
                el.btnModeZhBpmf.addEventListener("click", () => {
                    applyTypingMode("zh-bpmf");
                    renderStageSelect();
                    showCoach("Đã chuyển sang luyện phím chú âm.", 900);
                });
            }

            el.btnSelectBack.addEventListener("click", () => {
                closeOverlays();
                game.mode = "title";
                setTitleOptionsOpen(false);
                el.titleScreen.classList.add("show");
                renderTitleLeaderboard();
                if (isCloudWebhookConfigured() && (!game.cloud.lastSyncAt || (Date.now() - game.cloud.lastSyncAt) > 45000)) {
                    fetchCloudLeaderboard({ silent: true });
                }
            });

            el.stageSelectGrid.addEventListener("click", (event) => {
                const btn = event.target.closest("[data-stage-play]");
                if (!btn) return;
                const stageIndex = Number(btn.getAttribute("data-stage-play"));
                if (!Number.isFinite(stageIndex) || stageIndex < 0 || stageIndex >= STAGES.length) return;
                ensureAudioUnlocked();
                playSfx("click", 0.55);
                beginStageChallenge(stageIndex, false);
            });

            el.btnTitleSettings.addEventListener("click", () => {
                setTitleOptionsOpen(!game.titleOptionsOpen);
            });

            el.btnAssist.addEventListener("click", () => {
                game.profile.assistMode = !game.profile.assistMode;
                refreshOptionButtons();
                writeProfile();
                showCoach(game.profile.assistMode ? "Đã bật hỗ trợ" : "Đã tắt hỗ trợ", 900);
            });

            el.btnContrast.addEventListener("click", () => {
                game.profile.highContrast = !game.profile.highContrast;
                applyAccessibilityOptions();
                refreshOptionButtons();
                writeProfile();
            });

            el.btnMotion.addEventListener("click", () => {
                game.profile.reducedMotion = !game.profile.reducedMotion;
                applyAccessibilityOptions();
                refreshOptionButtons();
                writeProfile();
            });

            el.btnPause.addEventListener("click", () => {
                togglePause();
            });

            el.btnResume.addEventListener("click", () => {
                togglePause(false);
            });

            el.btnPauseToTitle.addEventListener("click", () => {
                const typingMode = getTypingModeKey();
                resetRun(true);
                applyTypingMode(typingMode);
                openStageSelectScreen();
            });

            el.btnReplay.addEventListener("click", () => {
                ensureAudioUnlocked();
                if (game.endlessBossMode) {
                    beginEndlessBossMode();
                } else {
                    beginStageChallenge(game.selectedStageIndex || 0, !!game.bossChallengeMode);
                }
            });

            el.btnPractice.addEventListener("click", () => {
                ensureAudioUnlocked();
                closeOverlays();
                resetRun(false);
                startPracticeMode();
            });

            el.btnRestart.addEventListener("click", () => {
                ensureAudioUnlocked();
                const typingMode = getTypingModeKey();
                resetRun(true);
                applyTypingMode(typingMode);
                openStageSelectScreen();
            });

            el.btnRetryStage.addEventListener("click", () => {
                ensureAudioUnlocked();
                closeOverlays();
                if (game.endlessBossMode) {
                    beginEndlessBossMode();
                    return;
                }
                const retryIndex = game.selectedStageIndex || game.stageIndex || 0;
                const keepBossMode = !!game.bossChallengeMode;
                const typingMode = getTypingModeKey();
                resetRun(false);
                applyTypingMode(typingMode);
                game.bossChallengeMode = retryIndex === 4 && keepBossMode;
                game.selectedStageIndex = retryIndex;
                loadStage(retryIndex, true);
            });

            el.btnFailRestart.addEventListener("click", () => {
                ensureAudioUnlocked();
                const typingMode = getTypingModeKey();
                resetRun(true);
                applyTypingMode(typingMode);
                openStageSelectScreen();
            });
        }

        function bindKeyboard() {
            if (el.imeInput) {
                el.imeInput.addEventListener("compositionstart", () => {
                    game.imeComposing = true;
                    game.imeDraftText = "";
                    updateImePanelHint();
                });
                el.imeInput.addEventListener("compositionupdate", (event) => {
                    game.imeDraftText = event.data || "";
                    updateImePanelHint();
                });
                el.imeInput.addEventListener("compositionend", () => {
                    game.imeComposing = false;
                    game.imeDraftText = "";
                    setTimeout(() => {
                        handleChineseWordComboImeInput();
                        updateImePanelHint();
                    }, 0);
                });
                el.imeInput.addEventListener("input", () => {
                    if (!game.imeComposing) handleChineseWordComboImeInput();
                    updateImePanelHint();
                });
            }

            window.addEventListener("keydown", (event) => {
                const imeFieldFocused = !!el.imeInput && document.activeElement === el.imeInput;
                const imeActive = imeFieldFocused && isChineseTypingStage();
                const stage = getStage();
                const allowBossSpaceThroughIme = !game.imeComposing && !event.isComposing && !el.imeInput.value.trim() && imeActive && game.mode === "playing" && stage?.mechanic === "boss_raid" && event.code === "Space";
                const allowBossGuardThroughIme =
                    imeFieldFocused &&
                    game.mode === "playing" &&
                    stage?.mechanic === "boss_raid" &&
                    !!game.stageData?.guardMode &&
                    (event.code === "KeyF" || event.code === "KeyJ" || event.code === "Space");
                if (game.mode === "playing" && !imeActive && ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
                    event.preventDefault();
                } else if (allowBossSpaceThroughIme) {
                    event.preventDefault();
                } else if (allowBossGuardThroughIme) {
                    event.preventDefault();
                }

                ensureAudioUnlocked();
                if (event.isComposing && !allowBossGuardThroughIme) return;

                if (game.mode === "cinematic" && (event.code === "Enter" || event.code === "Space")) {
                    if (game.victoryCinematic.active && typeof game.victoryCinematic.finish === "function") {
                        game.victoryCinematic.finish();
                    }
                    return;
                }

                if (event.code === "Escape" && (game.mode === "playing" || game.mode === "paused")) {
                    togglePause();
                    return;
                }

                if (game.mode === "dialogue" && (event.code === "Space" || event.code === "Enter")) {
                    advanceDialogue();
                    return;
                }

                if (imeActive && game.mode === "playing" && !allowBossSpaceThroughIme && !allowBossGuardThroughIme) {
                    return;
                }

                handleInput(event);
            });

            document.addEventListener("visibilitychange", () => {
                if (document.hidden && game.mode === "playing") {
                    game.autoPausedByBlur = true;
                    togglePause(true);
                }
            });

            window.addEventListener("blur", () => {
                if (game.mode === "playing") {
                    game.autoPausedByBlur = true;
                    togglePause(true);
                }
            });
        }

        async function bootstrap() {
            game.mode = "loading";
            readProfile();
            applyAccessibilityOptions();
            initStaticUI();
            syncCloudSettingsInputs();
            renderTitleLeaderboard();
            if (isCloudWebhookConfigured()) {
                setCloudSettingsStatus("Đã đọc thiết lập, đang chờ đồng bộ.", "neutral");
                setTitleLeaderboardStatus("Chờ đồng bộ", "neutral");
            } else {
                setCloudSettingsStatus("Có thể nhập Google Apps Script Web App URL để bật bảng xếp hạng.", "neutral");
                setTitleLeaderboardStatus("Chưa thiết lập URL", "warn");
            }
            syncCloudUploadPanelState();
            bindButtons();
            bindKeyboard();
            setScene("title");
            applyStageVisual(1);
            buildAmbientSparks();
            playBgm("title");
            refreshOptionButtons();
            setTitleOptionsOpen(false);
            renderStageSelect();
            updateHud();
            updateStageTrack();
            syncImeInputVisibility();
            requestAnimationFrame(loop);
            try {
                await runLoadingSequence();
            } catch (error) {
                setLoadingProgress(1, 1, "Một số tài nguyên chưa tải được. Đang tiếp tục vào trò chơi.");
                await new Promise((resolve) => setTimeout(resolve, 400));
            }
            if (el.loadingScreen) el.loadingScreen.classList.remove("show");
            if (el.titleScreen) el.titleScreen.classList.add("show");
            game.mode = "title";
            if (isCloudWebhookConfigured()) {
                fetchCloudLeaderboard({ silent: true });
            }
        }

// One shuffled pass through distinct vocabulary items before any answer repeats.
function createVocabularyDeck(tokens,random=Math.random){
 const unique=[...new Map(tokens.map(token=>[token.hanzi||token.text,token])).values()];
 let remaining=[],last='';
 function refill(){
  remaining=[...unique];
  for(let i=remaining.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[remaining[i],remaining[j]]=[remaining[j],remaining[i]];}
  if(remaining.length>1&&remaining[0].text===last){[remaining[0],remaining[1]]=[remaining[1],remaining[0]];}
 }
 return {next(excluded=[]){
  if(!unique.length)return null;
  if(!remaining.length)refill();
  const blocked=new Set(excluded);
  let index=remaining.findIndex(token=>!blocked.has(token.text)&&token.text!==last);
  if(index<0)index=remaining.findIndex(token=>!blocked.has(token.text));
  // If all remaining words are still on screen, wait until one has been answered.
  if(index<0)return null;
  const [token]=remaining.splice(index,1);last=token.text;return token;
 }};
}

// Keep the full session list; failed attempts and expired targets come first.
function sortedPracticeReview(items){
 return Object.values(items||{}).sort((a,b)=>b.wrong-a.wrong||b.correct-a.correct||a.label.localeCompare(b.label,'zh-Hant'));
}

// Owns committed Hanzi matching, independently of rendering or IME event order.
function assessRowInput(raw, available, known, confirm=false) {
 const text=String(raw||'').normalize('NFC').replace(/[\s\u3000]/g,'');
 if(!text)return {kind:'empty',text};
 const exact=available.find(([,token])=>token.text===text);
 if(exact){
  const longer=known.some(([,token])=>token.text.length>text.length&&token.text.startsWith(text));
  return longer&&!confirm?{kind:'confirm',text,key:exact[0]}:{kind:'match',text,key:exact[0]};
 }
 if(available.some(([,token])=>token.text.startsWith(text)))return {kind:'partial',text};
 if(known.some(([,token])=>token.text===text))return {kind:'unavailable',text};
 if(known.some(([,token])=>token.text.startsWith(text)))return {kind:'partial',text};
 // Latin preedit can be emitted before an OS marks composition as active.
 if(!confirm&&!/\p{Script=Han}/u.test(text))return {kind:'preedit',text};
 return {kind:'wrong',text};
}
function rowTargetEntries(data, mechanic){
 if(!data?.rowTokens)return [];
 if(mechanic==='top_anchor')return data.expectedType==='top'&&data.rowTokens[data.expectedKey]?[[data.expectedKey,data.rowTokens[data.expectedKey]]]:[];
 const objects=[...(data.objects||[])].sort((a,b)=>mechanic==='homefall'?b.y-a.y:a.x-b.x);
 return objects.filter(obj=>data.rowTokens[obj.char]).map(obj=>[obj.char,data.rowTokens[obj.char]]);
}

// Vietnamese adaptation over the original game's simulation, sprites and screens.
const practice = {mode:null,system:'hsk',level:'1',cumulative:false,cache:{},manifest:null,words:[],tokens:[],bopomofo:[],loaded:false};
const practiceModes={zhuyin:'Chú âm',simplified:'Chữ giản thể',traditional:'Chữ phồn thể'};
const vocabularyLevels={hsk:['1','2','3','4','5','6','7-9'],tocfl:['N1','N2','A1','A2','B1','B2','C1']};
const practiceTitle=()=>`${practiceModes[practice.mode]||'Chưa chọn'} · ${practice.system==='hsk'?levelName(practice.level):'TOCFL '+levelName(practice.level)}`;
function levelName(level){return practice.system==='hsk'?`HSK ${level.replace('-','–')}`:({N1:'Dự bị 1',N2:'Dự bị 2',C1:'C1–C2'}[level]||level);}
const originalProfileDefaults=JSON.parse(JSON.stringify(game.profile));
const nativeApplyTypingMode=applyTypingMode;
applyTypingMode=function(modeKey){nativeApplyTypingMode(practice.mode==='zhuyin'?'zh-bpmf':practice.mode?'zh-hanzi':modeKey);};
getTypingModeKey=function(){return practice.mode==='zhuyin'?'zh-bpmf':'zh-hanzi';};
getTypingModeLabel=function(){return practiceModes[practice.mode]||'Chọn nội dung';};
getTypingModeLongLabel=function(){return practiceTitle();};
const nativeRefreshModeButtons=refreshTypingModeButtons;
refreshTypingModeButtons=function(){nativeRefreshModeButtons();const options=[[el.btnModeEn,'simplified'],[el.btnModeZhHanzi,'traditional'],[el.btnModeZhBpmf,'zhuyin']];for(const [button,mode]of options){if(button){button.textContent=practiceModes[mode];button.classList.toggle('active',practice.mode===mode);}}};
// Do not connect to or write to the reference author's leaderboard.
isCloudWebhookConfigured=()=>false;
fetchCloudLeaderboard=async()=>{};
uploadPendingCloudScore=async()=>{};
const nativeRecord=getStageRecord;
getStageRecord=function(stageId){return nativeRecord(`${practice.mode}|${practice.system}|${practice.level}|${practice.cumulative}|${stageId}`);};
const nativeSpecialRecord=getSpecialRecord;
getSpecialRecord=function(key){return nativeSpecialRecord(`${practice.mode}|${practice.system}|${practice.level}|${practice.cumulative}|${key}`);};
buildBopomofoModeTokens=function(){return practice.bopomofo;};
const nativeCreateStageData=createStageData;
createStageData=function(stage){
 const data=nativeCreateStageData(stage);
 data.graceLeft=game.practiceMode?1:0;
 if(practice.mode!=='zhuyin'&&practice.tokens.length&&['homefall','top_anchor','bottom_defense'].includes(stage.mechanic)){
  data.rowTokens={};
 }
 return data;
};
const nativeKeyVisual=getKeyVisualLabel;
getKeyVisualLabel=function(key){const token=game.stageData?.rowTokens?.[key];return token?token.text:nativeKeyVisual(key);};
const nativeKeyPrompt=getKeyPromptLabel;
getKeyPromptLabel=function(key){return game.stageData?.rowTokens?.[key]?.text||nativeKeyPrompt(key);};
const nativeIsChineseTypingStage=isChineseTypingStage;
isChineseTypingStage=function(){
 if(practice.mode!=='zhuyin'&&practice.mode&&game.mode==='playing'&&game.stageData?.rowTokens){
  return !(getStage()?.mechanic==='top_anchor'&&game.stageData.expectedType==='anchor');
 }
 return nativeIsChineseTypingStage();
};
const nativeImeHint=updateImePanelHint;
updateImePanelHint=function(){
 if(isChineseTypingStage()&&game.stageData?.rowTokens){
  const stage=getStage(),data=game.stageData;
  el.imeTitle.textContent=`${practiceModes[practice.mode]} · dùng bộ gõ tiếng Trung`;
  const token=stage.mechanic==='top_anchor'?data.rowTokens[data.expectedKey]:null;
  el.imeHint.textContent=game.imeComposing?'Đang chọn chữ; chưa chấm đúng/sai.':token?`Nhập từ ${token.text}. Tiếp theo bấm F/J theo yêu cầu để đỡ đòn.`:'Nhập đúng từ trên phù văn hoặc ám khí đang bay. Chọn xong chữ để hệ thống chấm.';
  return;
 }
 nativeImeHint();
 if(practice.mode!=='zhuyin'&&isChineseTypingStage()){
  el.imeTitle.textContent=`${practiceModes[practice.mode]} · dùng bộ gõ tiếng Trung`;
  el.imeInput.placeholder='Gõ và chọn đúng chữ Hán';
  const data=game.stageData,target=getTokenText(data.currentToken||data.currentWord);
  el.imeHint.textContent=game.imeComposing?`Đang chọn chữ. Từ cần nhập: ${target}`:'Nhập từ trên ấn của đối thủ.';
 }
};
const nativeHanziInput=handleChineseWordComboImeInput;
handleChineseWordComboImeInput=function(confirm=false){
 if(game.imeComposing||game.mode!=='playing')return;
 if(isChineseTypingStage()&&game.stageData?.rowTokens){
  const data=game.stageData,stage=getStage();
  const entries=rowTargetEntries(data,stage.mechanic);
  const result=assessRowInput(el.imeInput.value,entries,Object.entries(data.rowTokens),confirm===true);
  if(result.kind==='empty')return;
  if(result.kind==='match'){
   const born=stage.mechanic==='top_anchor'?data.rowPromptBornAt:data.objects.find(o=>o.char===result.key)?.hanziBornAt;
   recordWordStat(result.text,performance.now()-(born||performance.now()),true);
   el.imeInput.value='';game.imeLastHandledValue='';
   if(stage.mechanic==='homefall')handleHomefallInput(result.key);
   else if(stage.mechanic==='top_anchor')handleTopAnchorInput(result.key);
   else handleBottomDefenseInput(result.key);
   const progress=stage.mechanic==='homefall'?(data.charge===0?'Đã xuất kiếm!':`Tích khí ${data.charge}/${data.chargeNeed}; đủ 3 lần đúng sẽ xuất kiếm.`):stage.mechanic==='bottom_defense'?(data.shieldCharge===0?'Đã phản kích!':`Tích khiên ${data.shieldCharge}/${data.shieldNeed}; đủ 3 nấc sẽ phản kích.`):'Bấm phím F/J được nhắc để đỡ đòn.';
   setTypingStatus(`Đúng rồi! ${result.text} · ${progress}`, 'success');
   data.spawnTimer=Math.min(data.spawnTimer||0,.35);
   updateObjectiveUI();renderPromptForStage();renderProjectiles();updateImePanelHint();return;
  }
  if(result.kind==='confirm'){setTypingStatus(`Gõ tiếp nếu chưa hết từ. Nếu muốn nhập ${result.text}, bấm Enter hoặc Xuất chiêu.`, 'pending');return;}
  if(result.kind==='partial'||result.kind==='preedit'){setTypingStatus('Gõ tiếp cho đủ từ rồi chọn chữ trong bộ gõ.', 'pending');return;}
  if(result.kind==='unavailable'){setTypingStatus(`Từ ${result.text} chưa xuất hiện hoặc đã hết lượt. Nhìn các mục tiêu đang bay.`, 'pending');return;}
  if(entries[0])recordWordStat(entries[0][1].text,0,false);
  recordAttempt(false);softMistake('Chưa đúng từ mục tiêu. Nhìn các mục tiêu đang bay và chọn lại chữ nhé.');
  setTypingStatus('Chưa đúng từ mục tiêu. Bạn có thể sửa lại trong ô nhập.', 'error');return;
 }
 if(confirm!==true&&el.imeInput.value&&!/\p{Script=Han}/u.test(el.imeInput.value)){setTypingStatus('Đang nhập phiên âm; hãy chọn chữ trong bộ gõ.', 'pending');return;}
 const hpBefore=game.playerHp,errorsBefore=game.totalTyped-game.correctTyped;
 nativeHanziInput();
 chargeFirstBossMistake(hpBefore,errorsBefore);
};
const nativeTopPrompt=stage2NextPrompt;
stage2NextPrompt=function(){nativeTopPrompt();const data=game.stageData;if(data?.rowTokens){if(data.expectedType==='top'){data.rowTokens[data.expectedKey]=nextVocabularyToken();renderPromptForStage();}data.deadlineDuration=(data.expectedType==='top'?combatTargetSeconds(getKeyVisualLabel(data.expectedKey).length):1.8)*1000;data.deadline=performance.now()+data.deadlineDuration;if(data.expectedType==='top')data.rowPromptBornAt=performance.now();}else if(data){data.deadlineDuration=(data.expectedType==='top'?targetSeconds:1.8)*1000;data.deadline=performance.now()+data.deadlineDuration;}};

const nativeLoadStage=loadStage;
loadStage=function(index,skipOpening=false){
 resetDamageIndicators();setTypingStatus('Nhìn mục tiêu trong trận đấu rồi bắt đầu gõ.');applyTypingMode();
 nativeLoadStage(index,skipOpening);
 if(game.practiceMode&&game.stageData&&getStage()?.mechanic==='word_combo'){
  const pool=practice.mode==='zhuyin'?practice.bopomofo:practice.tokens;
  const requested=game.practicePlan?.words||[];
  const selected=pool.filter(token=>requested.includes(token.text));
  game.stageData.words=selected.length?selected:pool.slice(0,12);
  game.stageData.reviewDeck=createVocabularyDeck(game.stageData.words);
  setCurrentWordToken(game.stageData,game.stageData.reviewDeck.next());
 }
};
startPracticeMode=function(){
 const pool=practice.mode==='zhuyin'?practice.bopomofo:practice.tokens;
 const slow=(game.lastResultInsights?.slowWords||[]).filter(text=>pool.some(token=>token.text===text));
 game.practicePlan={type:'words',words:slow.length?slow:pool.slice(0,6).map(token=>token.text)};
 game.analytics={keyStats:{},wordStats:{},practiceReview:{}};
 game.practiceMode=true;game.independentStageMode=false;game.bossChallengeMode=false;game.endlessBossMode=false;
 applyTypingMode();showCoach('Luyện lại các từ còn sai hoặc nhập chậm. Nhập đủ từ để xuất kiếm.',1800);loadStage(0);
};

const nativeStartGameplay=startStageGameplay;
startStageGameplay=function(){
 nativeStartGameplay();
 if(getStage()?.mechanic==='top_anchor'){const data=game.stageData;data.deadline=performance.now()+data.deadlineDuration;data.rowPromptBornAt=performance.now();}
 if(['word_combo','boss_raid'].includes(getStage()?.mechanic))beginWordTimer();
 if(practice.mode!=='zhuyin'&&game.stageData?.rowTokens){
  const stage=getStage();
  showCoach(stage.mechanic==='homefall'?'Nhập từ trên phù văn để tích khí. Đủ 3 nấc sẽ tự xuất kiếm.':stage.mechanic==='top_anchor'?'Nhập từ để đạp mây, rồi bấm F hoặc J theo yêu cầu để đỡ đòn.':'Nhập từ trên ám khí để đỡ. Đủ 3 nấc khiên sẽ tự phản kích.',3000);
 }
};
const nativeObjective=updateObjectiveUI;
updateObjectiveUI=function(){
 nativeObjective();
 if(game.stageData?.rowTokens){
  const descriptions={
   homefall:'Nhập bất kỳ phù văn nào đang rơi. Bỏ lỡ mất 10 HP; gõ sai mất 4 HP. Đủ 3 lần đúng sẽ tự xuất kiếm.',
   top_anchor:'Nhập từ để nhảy và tích vân khí. Bấm đúng F hoặc J được nhắc để đỡ đòn; đủ 2 nấc khí sẽ kích nổ mây.',
   bottom_defense:'Nhập bất kỳ ám khí nào đang bay. Lọt đòn mất 12 HP; gõ sai mất 4 HP. Đủ 3 nấc khiên sẽ tự phản kích.'
  };
  el.objectiveMain.textContent=descriptions[getStage()?.mechanic]||el.objectiveMain.textContent;
 }
};
const nativeActionGuide=renderActionGuide;
renderActionGuide=function(stage,data){
 nativeActionGuide(stage,data);
 if(data?.rowTokens){
  const first=el.objectiveGuide.querySelector('.guide-chip>span');
  if(first)first.textContent=stage.mechanic==='homefall'?'Nhập từ trên phù văn':stage.mechanic==='top_anchor'?'Nhập từ để đạp mây':'Nhập từ để đỡ đòn';
 }
};
const nativeResultScreen=openResultScreen;
openResultScreen=function(force=false,reason='normal'){
 nativeResultScreen(force,reason);
 if(game.mode!=='result')return;
 if(practice.mode!=='zhuyin'){
  const weak=Object.entries(game.analytics.wordStats).filter(([,stat])=>stat.failCount>0).sort((a,b)=>b[1].failCount-a[1].failCount).slice(0,3).map(([word])=>word);
  for(const node of el.learningReportText.childNodes)if(node.nodeType===3&&node.textContent.includes('Phím hay gõ sai:')){
   node.textContent=node.textContent.replace('Phím hay gõ sai:','Từ cần luyện lại:');
   if(node.nextSibling)node.nextSibling.textContent=weak.join('、')||'Chưa có từ nào gõ sai';
  }
  game.lastResultInsights.slowWords=[...new Set([...weak,...game.lastResultInsights.slowWords])].slice(0,6);
 }
 if(!game.practiceMode&&!game.endlessBossMode){el.resultTitle.textContent=`Kết quả ải ${getStage()?.id}`;}
 if(!game.practiceMode){el.btnPractice.style.display='inline-block';}
 el.resultStars.setAttribute('aria-label',`${el.resultStars.querySelectorAll('.on').length} trên 3 sao`);
};
const nativeRenderPrompt=renderPromptForStage;
renderPromptForStage=function(){
 nativeRenderPrompt();
 const hanzi=practice.mode!=='zhuyin',data=game.stageData,mechanic=getStage()?.mechanic;
 el.promptBoard.classList.toggle('hanzi-whole-word',hanzi);
 el.arena.dataset.mechanic=mechanic||'';
 el.arena.classList.toggle('world-guard',!!data&&(data.guardMode||mechanic==='top_anchor'&&data.expectedType==='anchor'));
 el.arena.classList.toggle('hanzi-gameplay',hanzi);
 if(hanzi){el.promptBoard.removeAttribute('title');el.promptBoard.removeAttribute('aria-label');}
 if(hanzi&&data&&['word_combo','boss_raid'].includes(mechanic)&&!data.guardMode){
  el.wordProgress.textContent=getTokenPhonetic(data.currentToken||data.currentWord);
 }
 renderActiveTypingCue();
};
// Keep F/J and Space free for the original defense and ultimate mechanics.
const nativeHandleInput=handleInput;
handleInput=function(event){if(event.target?.closest?.('#practice-setup,#combat-controls'))return;nativeHandleInput(event);};
function openPracticeSetup(step='mode'){
 closeOverlays();$('#practice-setup').classList.add('show');game.mode='practice-setup';
 $('#practice-modes').hidden=step!=='mode';$('#practice-levels').hidden=step==='mode';
 $('#practice-heading').textContent=step==='mode'?'Bạn muốn luyện gì?':`Chọn cấp độ · ${practiceModes[practice.mode]}`;
 $('#setup-step').textContent=step==='mode'?'BƯỚC 1 / 2 · CHỌN NỘI DUNG':'BƯỚC 2 / 2 · CHỌN VỐN TỪ';
 $('#setup-intro').textContent=step==='mode'?'Chọn nội dung trước, rồi chọn cấp độ và bước vào ngũ ải.':'Chọn vốn từ cho cả năm ải. Bạn có thể đổi lại trước mỗi lượt chơi.';
 $('#practice-status').textContent='';if(step!=='mode')renderVocabularyLevels();
 $('#practice-card').scrollTop=0;
 requestAnimationFrame(()=>{const focus=step==='mode'?$('[data-practice-mode]'):$('#vocabulary-system');focus?.focus({preventScroll:true});});
}
function renderVocabularyLevels(){
 $('#vocabulary-system').value=practice.system;$('#include-earlier').checked=practice.cumulative;
 const counts=practice.manifest?.levels[practice.system]||{};const mode=practice.mode==='zhuyin'?'zhuyin':'words';
 $('#vocabulary-levels').innerHTML=vocabularyLevels[practice.system].map(level=>`<button class="wood-btn vocabulary-level ${practice.level===level?'active':''}" data-vocabulary-level="${level}" aria-pressed="${practice.level===level}"><strong>${levelName(level)}</strong><small>${counts[level]?.[mode]?.toLocaleString('vi-VN')||'…'} từ mới</small></button>`).join('');
 document.querySelectorAll('[data-vocabulary-level]').forEach(button=>button.onclick=()=>{practice.level=button.dataset.vocabularyLevel;renderVocabularyLevels();});
 $('#vocabulary-note').textContent=practice.system==='hsk'?'HSK 3.0, đề cương 11/2025. HSK 7–9 dùng chung một danh sách nâng cao.':'TOCFL, danh sách 07/2023. Hai bậc dự bị, A1, A2, B1, B2 và bậc lưu loát C1–C2 dùng chung.';
 $('#mode-instruction').textContent=practice.mode==='zhuyin'?'Chuyển bàn phím sang tiếng Anh. Ba ải đầu luyện vị trí phím chú âm; ải 4–5 luyện chuỗi chú âm của từ đã chọn.':'Bật bộ gõ '+(practice.mode==='simplified'?'tiếng Trung giản thể':'tiếng Trung phồn thể')+'. Nhập chữ trên phù văn hoặc từ mục tiêu; bấm F/J khi được nhắc đỡ đòn.';
}
async function enterSelectedPractice(){
 const button=$('#enter-original-game');button.disabled=true;$('#practice-status').textContent='Đang chuẩn bị từ vựng…';
 try{
  if(!practice.cache[practice.system]){const response=await fetch(`/data/${practice.system}.json`);if(!response.ok)throw Error('data');practice.cache[practice.system]=await response.json();}
  const levels=vocabularyLevels[practice.system];const allowed=practice.cumulative?levels.slice(0,levels.indexOf(practice.level)+1):[practice.level];
  practice.words=practice.cache[practice.system].filter(w=>allowed.includes(w.level)&&(practice.mode!=='zhuyin'||w.keys));
  if(!practice.words.length)throw Error('empty');
  practice.tokens=practice.words.map(w=>({text:practice.mode==='simplified'?w.s:w.t,phonetic:'',sourceId:w.id}));
  practice.bopomofo=practice.words.filter(w=>w.keys).map(w=>({text:w.z.replace(/\s/g,''),phonetic:w.t+' · '+w.p,hanzi:w.t,input:w.keys,sourceId:w.id}));
  selectVocabularyDeck();
  ZH_TYPING_WORD_BANK.easy=practice.tokens;ZH_TYPING_WORD_BANK.middle=[];ZH_TYPING_WORD_BANK.hard=[];
  applyTypingMode();practice.loaded=true;
  $('#practice-setup').classList.remove('show');
  closeOverlays();game.mode='title';el.titleScreen.classList.add('show');
  $('#title-sub').textContent=`${practiceTitle()} · ${practice.words.length.toLocaleString('vi-VN')} mục từ${practice.cumulative?' (gồm các cấp trước)':''}. Năm ải độc lập, mỗi lượt 3 phút. Giữ mắt nhìn đối thủ và gõ đúng để xuất chiêu!`;
  renderStageSelect();updateContext();ensureAudioUnlocked();
 }catch(error){$('#practice-status').textContent='Chưa tải được từ vựng. Kiểm tra kết nối rồi thử lại.';}
 finally{button.disabled=false;}
}
function updateContext(){
 let button=$('#change-practice');if(!button){button=document.createElement('button');button.id='change-practice';button.className='wood-btn';button.onclick=()=>openPracticeSetup('level');$('#title-controls').append(button);}
 button.textContent='Đổi nội dung / cấp độ';
 $('#stage-select-sub').textContent=`${practiceTitle()} · ${practice.words.length.toLocaleString('vi-VN')} mục từ · Mỗi lượt 3:00, hết giờ tự tính điểm và sao.`;
}
function showLocalRecords(){
 closeOverlays();game.mode='leaderboard';el.leaderboardScreen.classList.add('show');
 $('#leaderboard-title').textContent='Thành tích trên máy này';$('#leaderboard-sub').textContent=practiceTitle();
 el.titleLeaderboardGrid.innerHTML=STAGES.map(stage=>{const record=getStageRecord(stage.id);return `<div class="rankboard"><strong>${stage.name}</strong><p>${renderStars(record.bestStars||0)}</p><p>Điểm cao nhất: ${Math.round(record.bestScore||0)}</p><p>Chính xác: ${Math.round(record.bestAcc||0)}% · Liên kích: ${Math.round(record.bestCombo||0)}</p><p>Đã vượt: ${Math.round(record.clearCount||0)} lượt</p></div>`;}).join('');
 $('#title-leaderboard-status').textContent='Lưu riêng theo nội dung, cấp độ và lựa chọn ôn tích lũy.';
}
function bindPracticeControls(){
 document.querySelectorAll('[data-practice-mode]').forEach(button=>button.onclick=()=>{practice.mode=button.dataset.practiceMode;practice.system=practice.mode==='simplified'?'hsk':'tocfl';practice.level=vocabularyLevels[practice.system][0];practice.cumulative=false;openPracticeSetup('level');});
 $('#vocabulary-system').onchange=event=>{practice.system=event.target.value;practice.level=vocabularyLevels[practice.system][0];renderVocabularyLevels();};
 $('#include-earlier').onchange=event=>practice.cumulative=event.target.checked;
 $('#change-practice-mode').onclick=()=>openPracticeSetup('mode');$('#enter-original-game').onclick=enterSelectedPractice;
 // Capture replaces only mode-selection navigation; original stage actions remain intact.
 const intercept=(element,fn)=>element?.addEventListener('click',event=>{event.stopImmediatePropagation();fn();},true);
 intercept(el.btnModeEn,()=>{practice.mode='simplified';openPracticeSetup('level');});
 intercept(el.btnModeZhHanzi,()=>{practice.mode='traditional';openPracticeSetup('level');});
 intercept(el.btnModeZhBpmf,()=>{practice.mode='zhuyin';openPracticeSetup('level');});
 el.btnReplay.addEventListener('click',event=>{
  if(!game.practiceMode)return;
  event.stopImmediatePropagation();ensureAudioUnlocked();
  const plan=JSON.parse(JSON.stringify(game.practicePlan));closeOverlays();resetRun(false);
  game.practiceMode=true;game.independentStageMode=false;game.practicePlan=plan;
  applyTypingMode();showCoach('Luyện lại cùng bộ từ, không tính sao.',1400);loadStage(0);
 },true);
 intercept(el.btnOpenLeaderboard,showLocalRecords);intercept(el.btnLeaderboardRefresh,showLocalRecords);
 $('#title-leaderboard-title').textContent='Thành tích từng ải';
 $('#cloud-settings').hidden=true;$('#cloud-upload-panel').hidden=true;$('#btn-leaderboard-refresh').textContent='Làm mới thành tích';
 $('#control-hints').textContent='Chọn ải để thử sức trong 3 phút. Ba ải đầu: tụ khí, khinh công và đỡ ám khí. Hai ải sau: liên chiêu từ vựng và đấu ma vương. Ma vương vô tận không giới hạn thời gian. F/J để đỡ đòn theo yêu cầu; ở ải 5, bấm Space để tung tuyệt chiêu khi đủ nội lực.';
 el.imeInput.setAttribute('aria-label','Nhập từ mục tiêu bằng bộ gõ tiếng Trung');
 const confirm=document.createElement('button');confirm.id='ime-confirm';confirm.className='wood-btn';confirm.textContent='Xuất chiêu ↵';confirm.type='button';confirm.onpointerdown=event=>event.preventDefault();confirm.onclick=()=>{handleChineseWordComboImeInput(true);if(isChineseTypingStage())el.imeInput.focus({preventScroll:true});};el.imePanel.append(confirm);
 const status=document.createElement('div');status.id='typing-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');el.imePanel.append(status);
 el.imeInput.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.isComposing&&event.keyCode!==229&&!game.imeComposing){event.preventDefault();handleChineseWordComboImeInput(true);}});
 el.imeInput.addEventListener('paste',event=>{event.preventDefault();showToast('Hãy tự gõ để luyện tay nhé.',1000);});
}
// Concurrent targets are read directly from the moving objects in the arena.
const nativeSpawnCap=getAdaptiveSpawnCap;
getAdaptiveSpawnCap=function(mechanic){return game.stageData?.rowTokens&&['homefall','bottom_defense'].includes(mechanic)?(game.practiceMode?1:combatPressureTier()+2):nativeSpawnCap(mechanic);};
function tuneHanziObjects(){
 const data=game.stageData;if(!data)return;
 const rect=el.arena.getBoundingClientRect(),mechanic=getStage()?.mechanic;
 for(const obj of data.objects||[]){
  if(obj.hanziPaced)continue;obj.hanziPaced=true;obj.hanziBornAt=performance.now();
  const seconds=combatTargetSeconds(data.rowTokens?.[obj.char]?.text.length||1);
  if(mechanic==='homefall'){obj.y=Math.max(95,obj.y);obj.x=rect.width*(.43+(obj.id%3)*.19);obj.speed=Math.max(.1,(rect.height-38-obj.y)/seconds);obj.drift=0;}
  else if(mechanic==='bottom_defense'){obj.y=110+(obj.id%3)*Math.max(58,(rect.height-300)/3);obj.speed=Math.max(.1,(obj.x-126)/seconds);}
 }
}
const nativeHomefallUpdate=updateHomefall;
updateHomefall=function(dt){const data=game.stageData,before=[...(data?.objects||[])];nativeHomefallUpdate(dt);recordExpiredRowWords(data,before);tuneHanziObjects();};
const nativeBottomUpdate=updateBottomDefense;
updateBottomDefense=function(dt){const data=game.stageData,before=[...(data?.objects||[])];nativeBottomUpdate(dt);recordExpiredRowWords(data,before);tuneHanziObjects();};
function recordExpiredRowWords(data,before){
 if(!data)return;
 const live=new Set((data.objects||[]).map(o=>o.id));
 if(!data.rowTokens){if(practice.mode==='zhuyin')for(const obj of before)if(!live.has(obj.id)){const item=practiceReviewItem(getKeyVisualLabel(obj.char));if(item)item.wrong++;}return;}
 for(const obj of before)if(!live.has(obj.id)&&data.rowTokens[obj.char])recordWordStat(data.rowTokens[obj.char].text,0,false);
}
const nativeTopAnchorUpdate=updateTopAnchor;
updateTopAnchor=function(){const d=game.stageData;if(d?.expectedType==='top'&&performance.now()>d.deadline){if(d.rowTokens)recordWordStat(d.rowTokens[d.expectedKey]?.text,0,false);else if(practice.mode==='zhuyin'){const item=practiceReviewItem(getKeyVisualLabel(d.expectedKey));if(item)item.wrong++;}}nativeTopAnchorUpdate();};
let typingSuccessUntil=0;
function setTypingStatus(text,kind='pending'){
 if(kind==='success')typingSuccessUntil=performance.now()+1200;
 const node=$('#typing-status');if(!node)return;
 if(node.textContent!==text)node.textContent=text;node.dataset.kind=kind;
}
function displayRowEntries(data,mechanic){
 if(data?.rowTokens)return rowTargetEntries(data,mechanic);
 if(mechanic==='top_anchor')return data.expectedType==='top'?[[data.expectedKey,{text:getKeyPromptLabel(data.expectedKey),phonetic:'Bấm phím '+data.expectedKey.toUpperCase()}]]:[];
 return [...(data?.objects||[])].sort((a,b)=>mechanic==='homefall'?b.y-a.y:a.x-b.x).map(obj=>[obj.char,{text:getKeyPromptLabel(obj.char),phonetic:'Bấm phím '+obj.char.toUpperCase()}]);
}
function renderActiveTypingCue(){
 const data=game.stageData,stage=getStage();
 const row=!!data&&['homefall','top_anchor','bottom_defense'].includes(stage?.mechanic);
 el.promptMain.classList.toggle('hanzi-row-prompt',row);
 el.promptBoard.classList.toggle('single-hanzi-target',row);
 if(!row)return;
 if(stage.mechanic==='top_anchor'&&data.expectedType==='anchor'){
  el.promptStage.textContent='ĐỠ ĐÒN NGAY';el.promptMain.textContent=data.expectedKey.toUpperCase();el.promptSub.textContent='Bấm đúng phím này. Không nhập chữ Hán khi đỡ đòn.';el.wordProgress.textContent='';return;
 }
 const entries=displayRowEntries(data,stage.mechanic),token=entries[0]?.[1];
 el.promptStage.textContent=data.rowTokens?'GÕ TỪ NÀY':'BẤM PHÍM NÀY';el.promptMain.textContent=token?.text||'Chờ mục tiêu…';
 el.promptSub.textContent=token?(data.rowTokens?'Ưu tiên từ tô sáng. Các mục tiêu còn lại vẫn tiếp tục tiến tới!':'Bấm phím của ký hiệu được tô sáng, không gõ theo danh sách.'):'Mục tiêu tiếp theo sẽ xuất hiện ngay.';
 el.wordProgress.textContent=data.rowTokens?'':token?.phonetic||'';
}
// Reuse moving-object nodes instead of rebuilding the layer on every animation frame.
const nativeProjectileRenderer=renderProjectiles;
const projectileNodes=new Map();let projectileOwner=null,projectileSignature='';
renderProjectiles=function(){
 const stage=getStage(),data=game.stageData;
 if(!data||!['homefall','bottom_defense'].includes(stage?.mechanic)){projectileOwner=null;projectileNodes.clear();projectileSignature='';nativeProjectileRenderer();return;}
 if(projectileOwner!==data){el.projectileLayer.replaceChildren();projectileNodes.clear();projectileOwner=data;projectileSignature='';}
 const objects=data.objects||[],live=new Set(objects.map(obj=>obj.id));
 for(const [id,node]of projectileNodes)if(!live.has(id)){node.remove();projectileNodes.delete(id);}
 for(const obj of objects){
  let node=projectileNodes.get(obj.id);
  if(!node){node=document.createElement('div');node.className=(stage.mechanic==='homefall'?'rune-orb':'shadow-bolt')+' hanzi-object';node.style.left='0';node.style.top='0';const word=document.createElement('span');word.className='bubble-word';word.textContent=getKeyVisualLabel(obj.char);node.append(word);const timer=document.createElement('small');timer.className='bubble-seconds';node.append(timer);el.projectileLayer.append(node);projectileNodes.set(obj.id,node);}
  const rect=el.arena.getBoundingClientRect();
  // Keep the whole label and countdown visible without changing collision positions.
  const displayX=stage.mechanic==='homefall'?Math.max(8,Math.min(obj.x,rect.width-node.offsetWidth-8)):obj.x;
  const displayY=Math.max(8,Math.min(obj.y,rect.height-node.offsetHeight-8));
  node.style.transform=`translate3d(${displayX}px,${displayY}px,0)`;node.classList.remove('target-highlight');
  const seconds=stage.mechanic==='homefall'?(rect.height-38-obj.y)/obj.speed:(obj.x-126)/obj.speed;
  const time=Math.max(0,seconds);writeText(node.querySelector('.bubble-seconds'),`${time.toFixed(1)}s`);node.classList.toggle('bubble-urgent',time<=2);
  node.setAttribute('aria-label',`${getKeyVisualLabel(obj.char)} · ${time.toFixed(1)} giây`);
 }
 const signature=objects.map(o=>o.id+':'+o.char).join('|');
 if(signature!==projectileSignature){projectileSignature=signature;renderActiveTypingCue();if(!el.imeInput.value&&!game.imeComposing&&performance.now()>typingSuccessUntil)setTypingStatus(objects.length?'Nhập bất kỳ mục tiêu nào đang bay. Không cần theo thứ tự.':'Đang chờ mục tiêu tiếp theo.');}
};
// Damage feedback is driven by actual damage calls, not guessed from score or combo.
const combatFeedback={hero:{until:0,loss:0,before:0,max:1,reason:''},enemy:{until:0,loss:0,before:0,max:1,reason:''}};
let healthUiReady=false,damageMessageUntil=0;
function writeText(node,text){if(node&&node.textContent!==text)node.textContent=text;}
function ensureCombatHealthUI(){
 if(healthUiReady)return;healthUiReady=true;
 for(const [id,label]of [['hp-text','HP của bạn'],['enemy-text','HP đối thủ'],['qi-text','Nội lực'],['timer-text','Thời gian']]){
  const row=$('#'+id)?.closest('.bar-item');if(!row)continue;
  const name=document.createElement('span');name.className='bar-name';name.textContent=label;row.prepend(name);row.dataset.combatBar=id;
 }
 for(const who of ['hero','enemy']){
  const plate=document.createElement('div');plate.id=who+'-health';plate.className='combat-health '+who+'-health';
  plate.innerHTML=`<div class="combat-health-label"><strong></strong><span></span></div><div class="combat-health-track"><i class="health-loss-trail"></i><i class="health-current"></i></div><div class="health-warning"></div><div class="health-loss-number"></div>`;
  el.arena.append(plate);
 }
 const message=document.createElement('div');message.id='combat-damage-message';message.setAttribute('role','status');message.setAttribute('aria-live','polite');message.hidden=true;el.arena.append(message);
}
function resetDamageIndicators(){
 for(const who of ['hero','enemy'])combatFeedback[who]={until:0,loss:0,before:0,max:1,reason:''};damageMessageUntil=0;
}
function showCombatDamage(who,loss,before,max,reason,name){
 if(!(loss>0))return;ensureCombatHealthUI();
 const now=performance.now();combatFeedback[who]={until:now+1900,loss,before,max,reason};
 const format=n=>Number.isInteger(n)?String(n):n.toFixed(1);
 const text=who==='hero'?`Bạn mất ${format(loss)} HP${reason?' · '+reason:''}`:`${name||'Đối thủ'} mất ${format(loss)} HP`;
 const message=$('#combat-damage-message');writeText(message,text);message.dataset.who=who;message.hidden=false;damageMessageUntil=now+2400;
 el.arena.classList.toggle('player-damaged',who==='hero');
 if(who==='hero')setTimeout(()=>el.arena.classList.remove('player-damaged'),650);
 updateCombatHealthUI();
}
function updateCombatHealthUI(){
 ensureCombatHealthUI();const now=performance.now();
 for(const who of ['hero','enemy']){
  const plate=$('#'+who+'-health'),hp=who==='hero'?game.playerHp:game.enemyHp,max=who==='hero'?game.maxPlayerHp:game.maxEnemyHp;
  const state=combatFeedback[who],active=!!game.stageData&&['playing','paused','dialogue','preview','transition','cinematic','failed'].includes(game.mode);
  el.app.classList.toggle('in-combat',active);plate.hidden=!active;const ratio=max>0?Math.max(0,Math.min(1,hp/max)):0,recent=now<state.until;
  writeText(plate.querySelector('strong'),who==='hero'?'BẠN':(MONSTERS[game.currentMonster]?.name||'ĐỐI THỦ'));
  writeText(plate.querySelector('.combat-health-label>span'),`HP ${Math.ceil(hp)} / ${max}`);
  const width=(ratio*100).toFixed(1)+'%';
  if(plate.querySelector('.health-current').style.width!==width)plate.querySelector('.health-current').style.width=width;
  const trailWidth=(recent?Math.max(ratio,state.before/Math.max(1,state.max))*100:ratio*100).toFixed(1)+'%';
  if(plate.querySelector('.health-loss-trail').style.width!==trailWidth)plate.querySelector('.health-loss-trail').style.width=trailWidth;
  const low=who==='hero'&&ratio<=.25;plate.classList.toggle('low-health',low);plate.classList.toggle('recent-damage',recent);
  writeText(plate.querySelector('.health-warning'),low?'NGUY HIỂM · Sắp hết HP':'');
  writeText(plate.querySelector('.health-loss-number'),recent?`−${Number.isInteger(state.loss)?state.loss:state.loss.toFixed(1)} HP`:'');
  const row=$(`[data-combat-bar="${who==='hero'?'hp-text':'enemy-text'}"]`);row?.classList.toggle('recent-damage',recent);row?.classList.toggle('low-health',low);
 }
 const message=$('#combat-damage-message');message.hidden=now>=damageMessageUntil||!game.stageData;
 if(game.stageData)writeText(el.enemyText,`${Math.ceil(game.enemyHp)}/${game.maxEnemyHp}`);
}
function clearReplacedEnemyFeedback(){
 combatFeedback.enemy={until:0,loss:0,before:0,max:1,reason:''};
 const message=$('#combat-damage-message');if(message?.dataset.who==='enemy')damageMessageUntil=0;
}
const nativeFeedbackEnemy=setEnemy;
setEnemy=function(id){if(id!==game.currentMonster)clearReplacedEnemyFeedback();nativeFeedbackEnemy(id);};
const nativeFeedbackTimedCycle=resetTimedCycle;
resetTimedCycle=function(stage){nativeFeedbackTimedCycle(stage);clearReplacedEnemyFeedback();};
const nativeFeedbackEndlessCycle=resetEndlessBossCycle;
resetEndlessBossCycle=function(stage){nativeFeedbackEndlessCycle(stage);clearReplacedEnemyFeedback();};
const nativeWeakKeys=calculateWeakKeys;
calculateWeakKeys=function(limit=3){return nativeWeakKeys(limit).filter(key=>game.analytics.keyStats[key]?.miss>0);};
const nativeDamageEnemy=damageEnemy;
damageEnemy=function(amount){
 const before=game.enemyHp,max=game.maxEnemyHp,recipient=game.currentMonster,name=MONSTERS[recipient]?.name;
 nativeDamageEnemy(amount);
 if(amount>0&&before>0){
  showCombatDamage('enemy',Math.min(amount,before),before,max,'',name);
  if(recipient!==game.currentMonster)combatFeedback.enemy.until=0;
  if(amount>=before){
   writeText($('#combat-damage-message'),`Đã hạ ${name||'đối thủ'}!${game.enemyHp>0?' Đối thủ tiếp theo đã vào trận.':''}`);
   if(game.enemyHp>0)combatFeedback.enemy.until=0;
  }
 }
};
const nativeDamagePlayer=damagePlayer;
damagePlayer=function(amount,reason=''){
 const before=game.playerHp,max=game.maxPlayerHp;
 nativeDamagePlayer(amount,reason);
 if(amount>0&&before>0)showCombatDamage('hero',Math.min(amount,before),before,max,reason,'Bạn');
};
const nativeCombatHud=updateHud;
updateHud=function(){nativeCombatHud();updateCombatHealthUI();renderCombatPressure();};

// Combat balance: actual missed attacks matter; Chinese IME preedit is still unjudged.
function combatPressureTier(){return !game.practiceMode&&(performance.now()-game.stageStart)/1000>=60?1:0;}
function combatTargetSeconds(){return targetSeconds;}
function combatMissDamage(){return ({homefall:10,top_anchor:12,bottom_defense:12,word_combo:10,boss_raid:16})[getStage()?.mechanic]||10;}
const nativeProtectedPunishment=punishWithProtection;
punishWithProtection=function(options={}){return nativeProtectedPunishment({...options,hpLoss:game.practiceMode?(options.hpLoss??2):Math.max(options.hpLoss||0,combatMissDamage())});};
const nativeCombatReward=rewardAction;
rewardAction=function(options={}){return nativeCombatReward(game.practiceMode?options:{...options,heal:0});};
const nativeSoftMistake=softMistake;
softMistake=function(reason){nativeSoftMistake(reason);if(game.mode==='playing'&&!game.practiceMode){setHeroState('Injuried',280);triggerEnemyCast();const lateJump=getStage()?.mechanic==='top_anchor'&&game.stageData?.expectedType==='top'&&performance.now()>game.stageData.deadline;damagePlayer(lateJump?12:4,reason||'Gõ sai mục tiêu.');}};
const nativeSetCombatWord=setCurrentWordToken;
setCurrentWordToken=function(data,token){nativeSetCombatWord(data,token);data.wordTimeLeft=combatTargetSeconds();};
const nativeBalancedGameplay=updateGameplay;
updateGameplay=function(dt){
 nativeBalancedGameplay(dt);
 const data=game.stageData;
 if(game.mode!=='playing'||!data||!['word_combo','boss_raid'].includes(getStage()?.mechanic)||game.practiceMode)return;
 if(getStage()?.mechanic==='boss_raid'&&data.guardMode)return;
 if(data.wordGuardWasActive){data.wordGuardWasActive=false;return;}
 data.wordTimeLeft=(data.wordTimeLeft??combatTargetSeconds())-dt;
 if(data.wordTimeLeft<=0){
  recordWordStat(data.currentWord,0,false);triggerEnemyCast();punishWithProtection({hpLoss:combatMissDamage(),reason:getStage()?.mechanic==='boss_raid'?'Hết giờ! Ma vương chủ động xuất chiêu, bạn mất 16 HP.':'Hết giờ nhập từ, đối thủ đánh trúng!'});
  if(game.mode==='playing'){data.wordTimeLeft=combatTargetSeconds();renderPromptForStage();}
 }
};
function renderCombatPressure(){
 let node=$('#combat-pressure');if(!node){node=document.createElement('div');node.id='combat-pressure';el.promptBoard.append(node);}
 const data=game.stageData,mechanic=getStage()?.mechanic;
 let seconds=null;
 if(game.mode==='playing'&&data&&!game.practiceMode){
  if(mechanic==='word_combo'||mechanic==='boss_raid'&&!data.guardMode)seconds=data.wordTimeLeft;
  else if(mechanic==='top_anchor')seconds=(data.deadline-performance.now())/1000;
  else if(data.objects?.length){
   const rect=el.arena.getBoundingClientRect();
   seconds=Math.min(...data.objects.map(o=>mechanic==='homefall'?(rect.height-38-o.y)/o.speed:(o.x-126)/o.speed));
  }else if(mechanic==='boss_raid'&&data.guardMode)seconds=(data.guardDeadline-performance.now())/1000;
 }
 node.hidden=!Number.isFinite(seconds);
 if(!node.hidden){const time=Math.max(0,seconds);writeText(node,`Còn ${(time/combatSpeed).toFixed(1)}s · Bỏ lỡ −${combatMissDamage()} HP`);node.classList.toggle('urgent',time<=2);}
}


// Keep learning measurements in active play time, including row-based Hanzi prompts.
const nativeLearningPause=togglePause;
togglePause=function(force){
 const resume=game.mode==='paused',pausedAt=game.pauseStartedAt;
 nativeLearningPause(force);
 if(resume&&game.mode==='playing'&&pausedAt){
  const gap=performance.now()-pausedAt,data=game.stageData;
  if(game.currentWordStart)game.currentWordStart+=gap;
  if(data?.rowPromptBornAt)data.rowPromptBornAt+=gap;
  for(const obj of data?.objects||[])if(Number.isFinite(obj.hanziBornAt))obj.hanziBornAt+=gap;
 }
};
const nativePhysicalKeyStat=recordKeyStat;
recordKeyStat=function(key,correct){
 if(practice.mode==='zhuyin'&&typeof key==='string'&&key.length===1&&'0123456789,./;-'.includes(key)){
  const stat=game.analytics.keyStats[key]||(game.analytics.keyStats[key]={hit:0,miss:0});stat[correct?'hit':'miss']+=1;return;
 }
 nativePhysicalKeyStat(key,correct);
};
function chargeFirstBossMistake(hpBefore,errorsBefore){
 if(!game.practiceMode&&game.mode==='playing'&&getStage()?.mechanic==='boss_raid'&&game.playerHp===hpBefore&&game.totalTyped-game.correctTyped>errorsBefore)damagePlayer(4,'Gõ sai mục tiêu.');
}
const nativeFirstBossInput=handleBossInput;
handleBossInput=function(...args){const hp=game.playerHp,errors=game.totalTyped-game.correctTyped;nativeFirstBossInput(...args);chargeFirstBossMistake(hp,errors);};
const nativeRatingStars=renderStars;
renderStars=function(stars,max=3){return nativeRatingStars(stars,max).replaceAll('class="off">★','class="off">☆');};


// Endless encounters must save their result for both HP loss and proximity defeat.
const nativeEndlessFailStage=failStage;
failStage=function(reason){
 if(game.endlessBossMode&&getStage()?.mechanic==='boss_raid'){
  if(game.mode==='result')return;
  game.mode='transition';playSfx('lose',.78);openResultScreen(true,'endless-defeat');
  if(game.mode==='result')el.resultSub.textContent=`Kết thúc trận · ${reason||'Ma vương đã áp sát'}`;
  return;
 }
 nativeEndlessFailStage(reason);
};

// Shared deck survives wave resets and moving between the five stages.
const vocabularyDecks=new Map();let activeVocabularyDeck=null;
function selectVocabularyDeck(){
 const key=[practice.mode,practice.system,practice.level,practice.cumulative].join('|');
 if(!vocabularyDecks.has(key))vocabularyDecks.set(key,createVocabularyDeck(practice.mode==='zhuyin'?practice.bopomofo:practice.tokens));
 activeVocabularyDeck=vocabularyDecks.get(key);
}
function nextVocabularyToken(excluded=[]){return activeVocabularyDeck?.next(excluded);}
function drawRowTarget(data){
 if(!data.rowTokens)return pick(data.allowed);
 const used=new Set(data.objects.map(obj=>obj.char));
 const keys=data.allowed.filter(key=>!used.has(key));
 const key=pick(keys.length?keys:data.allowed);
 const token=nextVocabularyToken(data.objects.map(obj=>data.rowTokens[obj.char]?.text));
 // No duplicate concurrent target if a very small pool has been exhausted.
 if(!token)return null;
 data.rowTokens[key]=token;return key;
}
function nextFullVocabularyWord(){
 const data=game.stageData;
 const deck=game.practiceMode?(data.reviewDeck??=createVocabularyDeck(data.words)):activeVocabularyDeck;
 const token=deck?.next();if(token)setCurrentWordToken(data,token);
}
stage4NextWord=nextFullVocabularyWord;
stage5NextWord=nextFullVocabularyWord;

// Configure the actual response window in seconds; no speed conversion is needed.
let targetSeconds=5;const combatSpeed=1;
try{const saved=Number(localStorage.getItem('wuxia_target_seconds_v1'));if(Number.isInteger(saved)&&saved>=1&&saved<=60)targetSeconds=saved;}catch{}
function setTargetSeconds(value){
 const seconds=Number(value);if(!Number.isInteger(seconds)||seconds<1||seconds>60)return false;
 targetSeconds=seconds;try{localStorage.setItem('wuxia_target_seconds_v1',String(seconds));}catch{}
 const input=$('#target-seconds');if(input)input.value=String(seconds);
 document.querySelectorAll('[data-target-seconds]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.targetSeconds)===seconds)));
 const data=game.stageData;
 if(data&&(game.mode==='playing'||game.mode==='paused')){
  data.wordTimeLeft=seconds;
  const now=game.mode==='paused'?game.pauseStartedAt:performance.now();
  if(getStage()?.mechanic==='top_anchor'&&data.expectedType==='top'){data.deadlineDuration=seconds*1000;data.deadline=now+seconds*1000;}
  const rect=el.arena.getBoundingClientRect();
  for(const obj of data.objects||[]){if(getStage()?.mechanic==='homefall')obj.speed=Math.max(.1,(rect.height-38-obj.y)/seconds);else if(getStage()?.mechanic==='bottom_defense')obj.speed=Math.max(.1,(obj.x-126)/seconds);}
 }
 return true;
}
function mountCombatSpeedControls(){
 const controls=document.createElement('div');controls.id='combat-controls';el.btnPause.before(controls);controls.append(el.btnPause);
 const group=document.createElement('div');group.id='combat-speed';group.setAttribute('role','group');group.setAttribute('aria-label','Thời gian nhập mỗi từ');
 const label=document.createElement('label');label.htmlFor='target-seconds';label.textContent='Giây / từ';group.append(label);
 for(const seconds of [3,5,8,10]){const button=document.createElement('button');button.type='button';button.className='wood-btn';button.dataset.targetSeconds=seconds;button.textContent=seconds+'s';button.onpointerdown=event=>event.preventDefault();button.onclick=()=>setTargetSeconds(seconds);group.append(button);}
 const input=document.createElement('input');input.id='target-seconds';input.type='number';input.min='1';input.max='60';input.step='1';input.setAttribute('aria-label','Số giây cho mỗi từ, từ 1 đến 60');input.onchange=()=>{if(!setTargetSeconds(input.value))input.value=String(targetSeconds);};input.onkeydown=event=>{event.stopPropagation();if(event.key==='Enter'){event.preventDefault();input.onchange();input.blur();}};group.append(input);
 const unit=document.createElement('span');unit.className='seconds-unit';unit.textContent='giây (1–60)';group.append(unit);
 group.title='Mỗi từ mặc định 5 giây. Đổi số giây bất cứ lúc nào; mỗi lượt vẫn dài 3 phút.';controls.append(group);setTargetSeconds(targetSeconds);
}
const nativeHiddenHanziPhonetic=getTokenPhonetic;
getTokenPhonetic=function(token){return practice.mode==='zhuyin'?nativeHiddenHanziPhonetic(token):'';};
// Boss attacks on its own schedule, even while the player keeps answering.
getBossGuardCooldown=function(phase=1){return phase>=3?4:phase===2?5:6;};
const nativeActiveBossUpdate=updateBossRaid;
updateBossRaid=function(dt){const data=game.stageData,wasGuard=data?.guardMode;nativeActiveBossUpdate(dt);if(data&&game.stageData===data&&(wasGuard||data.guardMode)){data.wordGuardWasActive=true;}};
const nativeSpeedGameplay=updateGameplay;
updateGameplay=function(dt){
 const data=game.stageData;
 // These two original mechanics use wall-clock deadlines rather than dt timers.
 if(data){const extension=dt*(1-combatSpeed)*1000;
  if(getStage()?.mechanic==='top_anchor'&&data.deadline>0)data.deadline+=extension;
  if(getStage()?.mechanic==='boss_raid'&&data.guardMode&&data.guardDeadline>0)data.guardDeadline+=extension;
 }
 nativeSpeedGameplay(dt*combatSpeed);
};

// Per-run learning detail is separate from scoring and the persistent profile.
const nativeDetailedResetRun=resetRun;
resetRun=function(...args){nativeDetailedResetRun(...args);game.analytics={keyStats:{},wordStats:{},practiceReview:{}};};
function practiceReviewItem(word,token=null){
 if(!word)return null;
 const hanzi=practice.mode==='zhuyin'?token?.hanzi:null;
 const label=hanzi?`${hanzi} · ${word}`:word;
 const items=game.analytics.practiceReview??={};
 return items[label]??={label,correct:0,wrong:0};
}
const nativeDetailedWordStat=recordWordStat;
recordWordStat=function(word,duration,correct){
 nativeDetailedWordStat(word,duration,correct);
 const token=game.stageData?.currentToken;
 const item=practiceReviewItem(word,getTokenText(token)===word?token:null);
 if(item)item[correct?'correct':'wrong']++;
};
const nativeDetailedSetWord=setCurrentWordToken;
setCurrentWordToken=function(data,token){nativeDetailedSetWord(data,token);practiceReviewItem(getTokenText(token),token);};
const nativeDetailedRowTarget=drawRowTarget;
drawRowTarget=function(data){const key=nativeDetailedRowTarget(data);if(key){const token=data.rowTokens?.[key];practiceReviewItem(token?.text||getKeyVisualLabel(key));}return key;};
const nativeDetailedTopPrompt=stage2NextPrompt;
stage2NextPrompt=function(){nativeDetailedTopPrompt();const data=game.stageData;if(data?.expectedType==='top')practiceReviewItem(getKeyVisualLabel(data.expectedKey));};
const nativeDetailedKeyStat=recordKeyStat;
recordKeyStat=function(key,correct){
 nativeDetailedKeyStat(key,correct);
 if(practice.mode!=='zhuyin'||!['homefall','top_anchor','bottom_defense'].includes(getStage()?.mechanic))return;
 const data=game.stageData;
 const target=correct?key:getStage().mechanic==='top_anchor'?data.expectedKey:displayRowEntries(data,getStage().mechanic)[0]?.[0];
 // F/J defense keys are not vocabulary or Zhuyin-symbol practice items.
 if(getStage().mechanic==='top_anchor'&&data.expectedType==='anchor')return;
 const item=target&&practiceReviewItem(getKeyVisualLabel(target));if(item)item[correct?'correct':'wrong']++;
};
function resultText(parent,tag,text){const node=document.createElement(tag);node.textContent=text;parent.append(node);return node;}
function resultDisclosure(id,title){
 document.getElementById(id)?.remove();const node=document.createElement('details');node.id=id;node.className='result-disclosure';
 resultText(node,'summary',title);document.getElementById('learning-report').before(node);return node;
}
function renderPracticeReview(){
 const rows=sortedPracticeReview(game.analytics.practiceReview);
 const node=resultDisclosure('result-practice-detail',`Xem từ / ký hiệu đã luyện (${rows.length})`);
 resultText(node,'p','Xếp từ sai nhiều nhất lên đầu. “Sai / bỏ lỡ” gồm nhập sai và mục tiêu hết giờ; một từ có thể vừa đúng vừa sai.');
 if(!rows.length){resultText(node,'p','Chưa có mục tiêu nào trong lượt này.');return;}
 const table=document.createElement('table');table.className='practice-review-table';node.append(table);
 const head=table.createTHead().insertRow();for(const text of ['Từ / ký hiệu','Đúng','Sai / bỏ lỡ','Kết quả'])resultText(head,'th',text);
 const body=table.createTBody();
 for(const item of rows){const row=body.insertRow();if(item.wrong)row.className='needs-review';
  for(const text of [item.label,item.correct,item.wrong,item.wrong?'Cần luyện lại':item.correct?'Đã nhập đúng':'Chưa trả lời'])resultText(row,'td',String(text));
 }
}
function renderScoreExplanation(){
 const acc=calcAccuracy(),stage=getStage(),base=Math.round(game.stageScore),judge=buildJudgeScore(base,acc,game.maxCombo,game.totalTyped);
 const node=resultDisclosure('result-score-detail','Vì sao có số sao và xếp hạng này?');
 resultText(node,'p',`Điểm chiến đấu ${base.toLocaleString('vi-VN')} + chính xác ${judge.accScore.toLocaleString('vi-VN')} + liên kích ${judge.comboScore.toLocaleString('vi-VN')} + số lượt nhập ${judge.typedScore.toLocaleString('vi-VN')} = ${judge.total.toLocaleString('vi-VN')} điểm.`);
 resultText(node,'p','Điểm chính xác = % chính xác × 26; liên kích = chuỗi dài nhất × 34; số lượt nhập = tối đa 500 lượt × 8. Điểm chiến đấu gồm đòn đánh, thưởng và phạt trong trận.');
 if(game.practiceMode){resultText(node,'p','Luyện bổ sung không chấm sao hoặc xếp hạng thi đấu.');return;}
 const rating=game.endlessBossMode?evaluateSpecialModeResult('endlessBoss',judge.total,acc,game.maxCombo,game.totalTyped,game.stageCycles):evaluateStageResult(stage?.id||1,judge.total,acc,game.maxCombo,game.totalTyped);
 resultText(node,'p',`Ngưỡng điểm: ★ ${rating.tiers[0].toLocaleString('vi-VN')} · ★★ ${rating.tiers[1].toLocaleString('vi-VN')} · ★★★ ${rating.tiers[2].toLocaleString('vi-VN')}. Kết quả: ${rating.stars}/3 sao · hạng ${rating.grade}.`);
 if(game.endlessBossMode){resultText(node,'p','Ma vương vô tận còn nhận 1 / 2 / 3 sao khi vượt 3 / 8 / 15 vòng. Hạng S: 3 sao, chính xác ≥ 93%, chuỗi ≥ 28 và ≥ 220 lượt nhập; hạng A: ít nhất 2 sao và chính xác ≥ 90%. Các trường hợp còn lại: 3 / 2 / 1 / 0 sao tương ứng A / B / C / D.');}
 else{
  resultText(node,'p','Sao dựa trên tổng điểm, không chỉ % chính xác. Hạng S: 3 sao, chính xác ≥ 96%, chuỗi ≥ 26 và ≥ 180 lượt nhập. Nếu chưa đạt S: chính xác ≥ 92% và ít nhất 2 sao → A; nếu chưa đạt A: chính xác ≥ 86% và ít nhất 1 sao → B. Nếu không khớp các điều kiện trên, dùng hạng gốc theo sao: 3 / 2 / 1 / 0 sao → A / B / C / D.');
  if(rating.stars<3)resultText(node,'p',`Cần thêm ${(rating.tiers[rating.stars]-judge.total).toLocaleString('vi-VN')} điểm để đạt ${rating.stars+1} sao.`);
 }
 resultText(node,'p','Chơi chậm giúp có thêm thời gian nhập, nhưng trong 3 phút có thể ghi ít điểm hơn. Ngưỡng sao hiện tại giống nhau ở mọi tốc độ; hạng này phản ánh kết quả trò chơi, không phải trình độ tiếng Trung.');
}
const nativeDetailedResult=openResultScreen;
openResultScreen=function(...args){nativeDetailedResult(...args);if(game.mode==='result'){renderScoreExplanation();renderPracticeReview();}};

(async function bootVietnameseGame(){
 try{const response=await fetch('/data/manifest.json');if(response.ok)practice.manifest=await response.json();}catch{}
 await bootstrap();bindPracticeControls();mountCombatSpeedControls();mountOriginalWorld();openPracticeSetup('mode');
})();

// Original Lantern Atlas identity and layout; gameplay identifiers remain compatible.
function mountOriginalWorld(){
 const dock=document.createElement('div');dock.id='typing-dock';dock.setAttribute('aria-label','Khu vực nhập chữ, bên ngoài sân chơi');
 el.arena.after(dock);dock.append(el.imePanel);
 document.title='Đèn Sao · Hành trình chữ Hán';
 const brand=document.querySelector('.vn-wordmark');if(brand)brand.textContent='ĐÈN SAO';
 const enter=document.getElementById('enter-original-game');if(enter)enter.textContent='Vào học viện →';
 const title=document.getElementById('title-name');if(title)title.textContent='HỌC VIỆN ĐÈN SAO';
 const loading=document.getElementById('loading-title');if(loading)loading.textContent='Đang thắp đèn…';
 el.heroSprite.alt='Sứ giả Đèn Sao';
 const portrait=document.querySelector('#hero-card img');if(portrait)portrait.alt='Sứ giả Đèn Sao';
 const credits=document.querySelector('.adaptation-credit');if(credits){credits.textContent='Đèn Sao · Hình ảnh và âm nhạc sáng tác riêng · Phần chơi phát triển từ ';const link=document.createElement('a');link.href='https://changsheng0612.itch.io/typegamewuxia';link.textContent='TypeGameWuxia';link.target='_blank';link.rel='noopener';credits.append(link);}
}
const academyStageNames=['Vườn đom đóm','Cầu mây','Bến đèn','Thư viện sao','Cổng nhật thực'];
const academyStageInstructions=[
 'Nhìn chữ trong các bong bóng đang rơi. Nhập một từ bất kỳ còn trên sân; ba lần đúng sẽ thắp một luồng sáng.',
 'Nhập chữ đang nổi trên mây, rồi bấm F hoặc J khi được nhắc để giữ thăng bằng.',
 'Nhập chữ trên các hạt mực đang bay để ngăn chúng đi qua. Ba lần đỡ đúng sẽ tạo một đợt phản sáng.',
 'Nhìn chữ trên ấn nổi cạnh đối thủ. Nhập đủ cả từ trước khi hết giờ để mở ấn.',
 'Nhập chữ trên ấn của Thủ lĩnh Nhật thực. Khi thấy F hoặc J, đỡ trước rồi nhập tiếp. Đầy năng lượng thì bấm Space.'
];
STAGES.forEach((stage,i)=>{
 stage.name=`Ải ${i+1} · ${academyStageNames[i]}`;stage.subtitle=academyStageInstructions[i];
 stage.opening=[{speaker:'Người giữ đèn',text:academyStageInstructions[i]}];
 stage.clear=[{speaker:'Người giữ đèn',text:'Một ngọn đèn mới đã sáng. Giữ nhịp, đọc chữ và tiếp tục hành trình nhé.'}];
 if(STAGE_TRACK[i])STAGE_TRACK[i].name=academyStageNames[i];
});
const creatureNames={"boar_angry":"Mặt nạ giấy · ngọc","boar_angry_elite":"Bướm gấp · Tinh anh","cave_troll_boss":"Thủ lĩnh Đèn canh · hoàng hôn","corrupted_treant":"Rồng dải lụa · đồng","corrupted_treant_elite":"Diều đá · Tinh anh","crazed_scholar":"Mực linh · ngọc","crazed_scholar_elite":"Mảnh sao · Tinh anh","flying_eye":"Mặt nạ giấy · hoàng hôn","flying_eye_elite":"Bướm gấp · Tinh anh","forest_guardian_boss":"Thủ lĩnh Đèn canh · lá","forest_spirit":"Rồng dải lụa · ngọc","forest_spirit_elite":"Diều đá · Tinh anh","frost_wyrm_boss":"Thủ lĩnh Mực linh · hoàng hôn","ice_spirit":"Mảnh sao · đồng","ice_spirit_elite":"Mặt nạ giấy · Tinh anh","lava_elemental_boss":"Thủ lĩnh Bướm gấp · ngọc","lich_apprentice":"Đèn canh · sương","lich_apprentice_elite":"Rồng dải lụa · Tinh anh","mountain_bandit":"Diều đá · đồng","mountain_bandit_elite":"Mực linh · Tinh anh","nether_lord_boss":"Thủ lĩnh Mảnh sao · ngọc","placeholder_monster":"Mặt nạ giấy · sương","ruins_guardian_boss":"Thủ lĩnh Bướm gấp · hoàng hôn","shadow_imp":"Đèn canh · đồng","shadow_imp_elite":"Rồng dải lụa · Tinh anh","snakelet_bamboo":"Diều đá · ngọc","stone_golem":"Mực linh · sương","stone_golem_elite":"Mảnh sao · Tinh anh","undead_warrior":"Mặt nạ giấy · đồng","wolf_cub":"Bướm gấp · lá","wolf_cub_elite":"Đèn canh · Tinh anh","yeti":"Rồng dải lụa · sương"};
for(const [id,monster]of Object.entries(MONSTERS)){const base=id.replace(/_elite$/,'');monster.name=(creatureNames[id]||creatureNames[base]||'Mực linh');}
