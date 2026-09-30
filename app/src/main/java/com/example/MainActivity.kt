package com.example

import android.annotation.SuppressLint
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.webkit.ConsoleMessage
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material.icons.filled.OpenInBrowser
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView

class MainActivity : ComponentActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()

    setContent {
      RecitsInavouablesTheme {
        RecitsInavouablesApp()
      }
    }
  }
}

private val RecitsDarkColorScheme = darkColorScheme(
  primary = Color(0xFF8B5CF6),
  onPrimary = Color.White,
  primaryContainer = Color(0xFF4C1D95),
  onPrimaryContainer = Color(0xFFE9D5FF),
  secondary = Color(0xFF06B6D4),
  onSecondary = Color.Black,
  background = Color(0xFF08090D),
  onBackground = Color(0xFFF1F5F9),
  surface = Color(0xFF0E1118),
  onSurface = Color(0xFFF1F5F9),
  surfaceVariant = Color(0xFF151922),
  onSurfaceVariant = Color(0xFF94A3B8)
)

@Composable
fun RecitsInavouablesTheme(content: @Composable () -> Unit) {
  MaterialTheme(
    colorScheme = RecitsDarkColorScheme,
    content = content
  )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RecitsInavouablesApp() {
  val context = LocalContext.current
  var webViewInstance by remember { mutableStateOf<WebView?>(null) }
  var canGoBack by remember { mutableStateOf(false) }
  var showSqlDialog by remember { mutableStateOf(false) }

  BackHandler(enabled = canGoBack) {
    webViewInstance?.let { wv ->
      if (wv.canGoBack()) {
        wv.goBack()
      }
    }
  }

  Scaffold(
    modifier = Modifier
      .fillMaxSize()
      .testTag("recits_inavouables_screen"),
    contentWindowInsets = WindowInsets.safeDrawing,
    topBar = {
      TopAppBar(
        modifier = Modifier.testTag("app_top_bar"),
        title = {
          Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
          ) {
            Box(
              modifier = Modifier
                .size(32.dp)
                .background(
                  color = MaterialTheme.colorScheme.primary,
                  shape = RoundedCornerShape(8.dp)
                ),
              contentAlignment = Alignment.Center
            ) {
              Text(
                text = "R",
                fontWeight = FontWeight.Bold,
                color = Color.White,
                fontSize = 18.sp
              )
            }
            Column {
              Text(
                text = "RÉCITS INAVOUABLES",
                fontWeight = FontWeight.ExtraBold,
                fontSize = 15.sp,
                letterSpacing = 0.5.sp,
                color = MaterialTheme.colorScheme.onSurface
              )
              Text(
                text = "Littérature sombre & transgressive",
                fontSize = 10.sp,
                color = MaterialTheme.colorScheme.secondary
              )
            }
          }
        },
        actions = {
          IconButton(
            onClick = { showSqlDialog = true },
            modifier = Modifier.testTag("sql_dialog_button")
          ) {
            Icon(
              imageVector = Icons.Default.Code,
              contentDescription = "Script SQL Supabase",
              tint = MaterialTheme.colorScheme.primary
            )
          }

          IconButton(
            onClick = { webViewInstance?.reload() },
            modifier = Modifier.testTag("reload_button")
          ) {
            Icon(
              imageVector = Icons.Default.Refresh,
              contentDescription = "Rafraîchir",
              tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
          }

          IconButton(
            onClick = {
              val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://recits-inavouables.com"))
              try {
                context.startActivity(intent)
              } catch (e: Exception) {
                Toast.makeText(context, "Récits Inavouables", Toast.LENGTH_SHORT).show()
              }
            },
            modifier = Modifier.testTag("browser_button")
          ) {
            Icon(
              imageVector = Icons.Default.OpenInBrowser,
              contentDescription = "Ouvrir dans le navigateur",
              tint = MaterialTheme.colorScheme.onSurfaceVariant
            )
          }
        },
        colors = TopAppBarDefaults.topAppBarColors(
          containerColor = MaterialTheme.colorScheme.surface,
          titleContentColor = MaterialTheme.colorScheme.onSurface
        )
      )
    }
  ) { paddingValues ->
    Box(
      modifier = Modifier
        .fillMaxSize()
        .padding(paddingValues)
        .background(Color(0xFF08090D))
    ) {
      AndroidWebViewContainer(
        modifier = Modifier
          .fillMaxSize()
          .testTag("stories_webview"),
        onWebViewCreated = { wv ->
          webViewInstance = wv
        },
        onHistoryStateChanged = { canBack ->
          canGoBack = canBack
        }
      )
    }
  }

  if (showSqlDialog) {
    SqlSchemaDialog(onDismiss = { showSqlDialog = false })
  }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun AndroidWebViewContainer(
  modifier: Modifier = Modifier,
  onWebViewCreated: (WebView) -> Unit,
  onHistoryStateChanged: (Boolean) -> Unit
) {
  val context = LocalContext.current

  AndroidView(
    modifier = modifier,
    factory = { ctx ->
      WebView(ctx).apply {
        layoutParams = ViewGroup.LayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT,
          ViewGroup.LayoutParams.MATCH_PARENT
        )

        // Force software layer rendering to bypass Mesa GPU rendernode errors in headless/cloud emulator
        try {
          setLayerType(View.LAYER_TYPE_SOFTWARE, null)
        } catch (_: Exception) {}

        setBackgroundColor(android.graphics.Color.parseColor("#08090D"))

        settings.apply {
          javaScriptEnabled = true
          domStorageEnabled = true
          allowFileAccess = true
          allowContentAccess = true
          databaseEnabled = true
          useWideViewPort = true
          loadWithOverviewMode = true
          mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        webChromeClient = object : WebChromeClient() {
          override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
            return super.onConsoleMessage(consoleMessage)
          }
        }

        webViewClient = object : WebViewClient() {
          override fun onRenderProcessGone(view: WebView?, detail: RenderProcessGoneDetail?): Boolean {
            // Avoid crash if rendering process is terminated in container
            return true
          }

          override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
            super.onPageStarted(view, url, favicon)
            onHistoryStateChanged(canGoBack())
          }

          override fun onPageFinished(view: WebView?, url: String?) {
            super.onPageFinished(view, url)
            onHistoryStateChanged(canGoBack())
          }

          override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
            val targetUrl = request?.url?.toString() ?: return false
            if (targetUrl.startsWith("file:///android_asset/")) {
              return false
            }

            // Open external links (NOWPayments, Supabase, external links) in external browser
            try {
              val intent = Intent(Intent.ACTION_VIEW, Uri.parse(targetUrl))
              context.startActivity(intent)
              return true
            } catch (e: Exception) {
              return false
            }
          }
        }

        loadUrl("file:///android_asset/index.html")
        onWebViewCreated(this)
      }
    }
  )
}

@Composable
fun SqlSchemaDialog(onDismiss: () -> Unit) {
  val context = LocalContext.current
  val sqlScript = remember {
    """
    -- ====================================================================
    -- RÉCITS INAVOUABLES - REQUÊTES SQL POUR SUPABASE
    -- URL: https://znwcmypjlpgdsmpoaclc.supabase.co
    -- ====================================================================

    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- 1. Table Profiles (Créateurs uniquement)
    CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
        email TEXT,
        username TEXT,
        role TEXT DEFAULT 'creator',
        avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- 2. Table Stories (Genres : Cyberpunk, Dark Fantasy, Sci-Fi Thriller, Horreur / Occulte, Dystopie, Érotisme, Tabou)
    CREATE TABLE IF NOT EXISTS public.stories (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        cover_url TEXT DEFAULT 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        description TEXT NOT NULL,
        genre TEXT NOT NULL,
        author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
        author_name TEXT DEFAULT 'Auteur Inavouable',
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- 3. Table Episodes
    CREATE TABLE IF NOT EXISTS public.episodes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE NOT NULL,
        episode_number INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        is_free BOOLEAN DEFAULT false NOT NULL,
        price NUMERIC(5,2) DEFAULT 0.99 NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
        CONSTRAINT unique_story_episode UNIQUE (story_id, episode_number)
    );

    -- 4. Row Level Security (RLS)
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Public stories are viewable by everyone" ON public.stories FOR SELECT USING (true);
    CREATE POLICY "Public episodes are viewable by everyone" ON public.episodes FOR SELECT USING (true);
    CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

    CREATE POLICY "Creators can insert their stories" ON public.stories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
    CREATE POLICY "Creators can insert episodes" ON public.episodes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
    """.trimIndent()
  }

  AlertDialog(
    onDismissRequest = onDismiss,
    modifier = Modifier.testTag("sql_schema_dialog"),
    title = {
      Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
      ) {
        Icon(
          imageVector = Icons.Default.Code,
          contentDescription = null,
          tint = MaterialTheme.colorScheme.primary
        )
        Text(
          text = "Schéma SQL Supabase",
          fontWeight = FontWeight.Bold,
          fontSize = 18.sp
        )
      }
    },
    text = {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .heightIn(max = 380.dp)
          .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(10.dp)
      ) {
        Text(
          text = "Exécutez ce script dans le SQL Editor de Supabase (https://znwcmypjlpgdsmpoaclc.supabase.co) pour initialiser les tables et politiques :",
          fontSize = 12.sp,
          color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Surface(
          shape = RoundedCornerShape(8.dp),
          color = Color(0xFF0D1117),
          modifier = Modifier.fillMaxWidth()
        ) {
          Text(
            text = sqlScript,
            modifier = Modifier.padding(12.dp),
            fontFamily = FontFamily.Monospace,
            fontSize = 11.sp,
            color = Color(0xFF38BDF8),
            lineHeight = 16.sp
          )
        }
      }
    },
    confirmButton = {
      Button(
        onClick = {
          val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
          val clip = ClipData.newPlainText("Supabase SQL", sqlScript)
          clipboard.setPrimaryClip(clip)
          Toast.makeText(context, "Script SQL copié dans le presse-papiers !", Toast.LENGTH_LONG).show()
          onDismiss()
        },
        modifier = Modifier.testTag("copy_sql_button"),
        colors = ButtonDefaults.buttonColors(
          containerColor = MaterialTheme.colorScheme.primary
        )
      ) {
        Icon(Icons.Default.ContentCopy, contentDescription = null, modifier = Modifier.size(16.dp))
        Text(text = " Copier le SQL", modifier = Modifier.padding(start = 4.dp))
      }
    },
    dismissButton = {
      OutlinedButton(onClick = onDismiss) {
        Text("Fermer")
      }
    },
    containerColor = MaterialTheme.colorScheme.surface,
    titleContentColor = MaterialTheme.colorScheme.onSurface,
    textContentColor = MaterialTheme.colorScheme.onSurfaceVariant
  )
}
