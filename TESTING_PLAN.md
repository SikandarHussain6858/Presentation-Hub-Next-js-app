# 🧪 PHASE 1 ANALYTICS TESTING PLAN

## ✅ Build Status
- Build: PASSED (no errors)
- Dev Server: RUNNING on http://localhost:3000
- Turbopack Compiler: Active
- TypeScript: Compiled successfully

## 📋 Test Cases

### TEST 1: Create Analytics Document (Upload Presentation)
**Expected**: Analytics document created with viewCount=0, downloadCount=0
**Steps**:
1. Go to Dashboard (authenticated)
2. Upload a test presentation (e.g., "test.pdf")
3. Check MongoDB: Analytics collection should have 1 new document
**Status**: READY TO TEST

### TEST 2: Track View Event (Classroom Code Entry)
**Expected**: Analytics.viewCount incremented, accessHistory updated
**Steps**:
1. Get presentation uniqueCode from dashboard
2. Open Classroom mode
3. Enter the code
4. Check MongoDB: viewCount should be 1, accessHistory[0].viewCount should be 1
**Status**: READY TO TEST

### TEST 3: Analytics Dashboard Display
**Expected**: Dashboard shows stats and charts
**Steps**:
1. Go to Dashboard → Analytics link
2. Should show: Total Views=1, Downloads=0, Live Sessions=0
3. Should show presentation in table with 1 view
**Status**: READY TO TEST

### TEST 4: Track Download Event
**Expected**: Analytics.downloadCount incremented
**Steps**:
1. In Classroom mode, download the file
2. Check MongoDB: downloadCount should be 1
**Status**: READY TO TEST

### TEST 5: Analytics Update After Download
**Expected**: Dashboard reflects new download count
**Steps**:
1. Refresh Analytics Dashboard
2. Should show: Downloads=1
**Status**: READY TO TEST

### TEST 6: Multiple Views
**Expected**: Counter increments per view
**Steps**:
1. Enter classroom code 3 more times
2. Check dashboard: viewCount should be 4
**Status**: READY TO TEST

## 🔧 Manual Verification Commands

### Check if Analytics collection exists:
```js
db.analytics.find().count()
```

### Check specific analytics document:
```js
db.analytics.findOne({ presentationId: ObjectId("...") })
```

### Check accessHistory:
```js
db.analytics.findOne({}, { accessHistory: 1 })
```

## 📊 API Endpoints to Verify

✅ POST /api/analytics/track
- Request: { presentationId, eventType: "view"|"download" }
- Response: { success, data: { viewCount, downloadCount, ... } }

✅ GET /api/analytics
- Request: (authenticated user)
- Response: { success, data: { stats, presentations[], charts, ... } }

✅ GET /api/presentations/download/[id]
- Should call analytics/track internally
- Transparently increments downloadCount

✅ GET /api/presentations?uniqueCode=...
- Classroom fetches presentation
- Frontend calls analytics/track

## 🎯 Key Metrics to Verify

1. **Analytics Model**: All fields present (viewCount, downloadCount, etc.)
2. **accessHistory**: Daily breakdown working correctly
3. **Dashboard**: Stats cards show correct numbers
4. **Charts**: Views over time rendering
5. **Table**: Presentations listed with metrics
6. **Real-time**: Refresh shows updated numbers

## 🚀 Next Steps After Testing

If all tests pass:
- [ ] Phase 2: Live Sessions (Socket.IO setup)
- [ ] Phase 2: Session model and API
- [ ] Phase 2: Presenter/Viewer pages
- [ ] Integration and deployment

---

**Start Time**: Now
**Test Duration Expected**: 15-20 minutes
**Status**: READY TO EXECUTE
