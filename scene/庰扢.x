xof 0303txt 0032
template Vector {
 <3d82ab5e-62da-11cf-ab39-0020af71e433>
 FLOAT x;
 FLOAT y;
 FLOAT z;
}

template MeshFace {
 <3d82ab5f-62da-11cf-ab39-0020af71e433>
 DWORD nFaceVertexIndices;
 array DWORD faceVertexIndices[nFaceVertexIndices];
}

template Mesh {
 <3d82ab44-62da-11cf-ab39-0020af71e433>
 DWORD nVertices;
 array Vector vertices[nVertices];
 DWORD nFaces;
 array MeshFace faces[nFaces];
 [...]
}

template MeshNormals {
 <f6f23f43-7686-11cf-8f52-0040333594a3>
 DWORD nNormals;
 array Vector normals[nNormals];
 DWORD nFaceNormals;
 array MeshFace faceNormals[nFaceNormals];
}

template Coords2d {
 <f6f23f44-7686-11cf-8f52-0040333594a3>
 FLOAT u;
 FLOAT v;
}

template MeshTextureCoords {
 <f6f23f40-7686-11cf-8f52-0040333594a3>
 DWORD nTextureCoords;
 array Coords2d textureCoords[nTextureCoords];
}

template ColorRGBA {
 <35ff44e0-6c7c-11cf-8f52-0040333594a3>
 FLOAT red;
 FLOAT green;
 FLOAT blue;
 FLOAT alpha;
}

template ColorRGB {
 <d3e16e81-7835-11cf-8f52-0040333594a3>
 FLOAT red;
 FLOAT green;
 FLOAT blue;
}

template Material {
 <3d82ab4d-62da-11cf-ab39-0020af71e433>
 ColorRGBA faceColor;
 FLOAT power;
 ColorRGB specularColor;
 ColorRGB emissiveColor;
 [...]
}

template MeshMaterialList {
 <f6f23f42-7686-11cf-8f52-0040333594a3>
 DWORD nMaterials;
 DWORD nFaceIndexes;
 array DWORD faceIndexes[nFaceIndexes];
 [Material <3d82ab4d-62da-11cf-ab39-0020af71e433>]
}

template TextureFilename {
 <a42790e1-7810-11cf-8f52-0040333594a3>
 STRING filename;
}


Mesh {
 56;
 0.000000;0.576880;-0.399380;,
 0.399380;0.576880;0.000000;,
 0.282400;0.576880;-0.282400;,
 0.282400;0.576880;0.282400;,
 0.000000;0.576880;0.399380;,
 -0.282400;0.576880;0.282400;,
 -0.399380;0.576880;0.000000;,
 -0.282400;0.576880;-0.282400;,
 0.000000;0.000000;-0.312800;,
 0.221180;0.000000;-0.221180;,
 0.312800;0.000000;0.000000;,
 0.221180;0.000000;0.221180;,
 0.000000;0.000000;0.312800;,
 -0.221180;0.000000;0.221180;,
 -0.312800;0.000000;0.000000;,
 -0.221180;0.000000;-0.221180;,
 0.306620;0.503020;-0.306620;,
 0.000000;0.503020;-0.433640;,
 0.000000;0.576880;-0.399380;,
 0.282400;0.576880;-0.282400;,
 0.433640;0.503020;0.000000;,
 0.399380;0.576880;0.000000;,
 0.306620;0.503020;0.306620;,
 0.433640;0.503020;0.000000;,
 0.399380;0.576880;0.000000;,
 0.282400;0.576880;0.282400;,
 0.000000;0.503020;0.433640;,
 0.000000;0.576880;0.399380;,
 -0.306620;0.503020;0.306620;,
 -0.282400;0.576880;0.282400;,
 -0.433640;0.503020;0.000000;,
 -0.399380;0.576880;0.000000;,
 -0.306620;0.503020;-0.306620;,
 -0.433640;0.503020;0.000000;,
 -0.399380;0.576880;0.000000;,
 -0.282400;0.576880;-0.282400;,
 0.256520;0.031160;-0.256520;,
 0.221180;0.000000;-0.221180;,
 0.000000;0.000000;-0.312800;,
 0.000000;0.031160;-0.362780;,
 0.362780;0.031160;0.000000;,
 0.312800;0.000000;0.000000;,
 0.256520;0.031160;0.256520;,
 0.221180;0.000000;0.221180;,
 0.312800;0.000000;0.000000;,
 0.362780;0.031160;0.000000;,
 0.000000;0.031160;0.362780;,
 0.000000;0.000000;0.312800;,
 -0.256520;0.031160;0.256520;,
 -0.221180;0.000000;0.221180;,
 -0.362780;0.031160;0.000000;,
 -0.312800;0.000000;0.000000;,
 -0.256520;0.031160;-0.256520;,
 -0.221180;0.000000;-0.221180;,
 -0.312800;0.000000;0.000000;,
 -0.362780;0.031160;0.000000;;
 60;
 3;0,1,2;,
 3;0,3,1;,
 3;0,4,3;,
 3;0,5,4;,
 3;0,6,5;,
 3;0,7,6;,
 3;8,9,10;,
 3;8,10,11;,
 3;8,11,12;,
 3;8,12,13;,
 3;8,13,14;,
 3;8,14,15;,
 3;16,17,18;,
 3;16,18,19;,
 3;20,16,19;,
 3;20,19,21;,
 3;22,23,24;,
 3;22,24,25;,
 3;26,22,25;,
 3;26,25,27;,
 3;28,26,27;,
 3;28,27,29;,
 3;30,28,29;,
 3;30,29,31;,
 3;32,33,34;,
 3;32,34,35;,
 3;17,32,35;,
 3;17,35,18;,
 3;36,37,38;,
 3;36,38,39;,
 3;36,39,17;,
 3;36,17,16;,
 3;40,41,37;,
 3;40,37,36;,
 3;40,36,16;,
 3;40,16,20;,
 3;42,43,44;,
 3;42,44,45;,
 3;42,45,23;,
 3;42,23,22;,
 3;46,47,43;,
 3;46,43,42;,
 3;46,42,22;,
 3;46,22,26;,
 3;48,49,47;,
 3;48,47,46;,
 3;48,46,26;,
 3;48,26,28;,
 3;50,51,49;,
 3;50,49,48;,
 3;50,48,28;,
 3;50,28,30;,
 3;52,53,54;,
 3;52,54,55;,
 3;52,55,33;,
 3;52,33,32;,
 3;39,38,53;,
 3;39,53,52;,
 3;39,52,32;,
 3;39,32,17;;

 MeshNormals {
  56;
  0.000000;1.000000;0.000000;,
  0.000000;1.000000;0.000000;,
  0.000000;1.000000;0.000000;,
  0.000000;1.000000;0.000000;,
  0.000000;1.000000;0.000000;,
  0.000000;1.000000;0.000000;,
  0.000000;1.000000;0.000000;,
  0.000000;1.000000;0.000000;,
  0.000000;-0.991021;-0.133710;,
  0.256190;-0.932059;-0.256190;,
  0.271820;-0.962348;0.000000;,
  0.192206;-0.962348;0.192206;,
  0.000000;-0.962348;0.271820;,
  -0.192206;-0.962348;0.192206;,
  -0.271820;-0.962348;0.000000;,
  -0.256190;-0.932059;-0.256190;,
  0.699754;0.143835;-0.699754;,
  0.000000;0.143837;-0.989601;,
  0.000000;0.420740;-0.907181;,
  0.641476;0.420737;-0.641474;,
  0.989602;0.143834;0.000000;,
  0.907184;0.420735;0.000000;,
  0.699754;0.143834;0.699754;,
  0.989602;0.143834;0.000000;,
  0.907184;0.420735;0.000000;,
  0.641476;0.420735;0.641476;,
  0.000000;0.143834;0.989602;,
  0.000000;0.420735;0.907184;,
  -0.699754;0.143834;0.699754;,
  -0.641476;0.420735;0.641476;,
  -0.989602;0.143834;0.000000;,
  -0.907184;0.420735;0.000000;,
  -0.699754;0.143835;-0.699754;,
  -0.989602;0.143834;0.000000;,
  -0.907184;0.420735;0.000000;,
  -0.641476;0.420737;-0.641474;,
  0.586079;-0.559484;-0.586079;,
  0.256190;-0.932059;-0.256190;,
  0.000000;-0.991021;-0.133710;,
  0.000000;-0.559485;-0.828841;,
  0.828841;-0.559485;0.000000;,
  0.271820;-0.962348;0.000000;,
  0.586079;-0.559484;0.586079;,
  0.192206;-0.962348;0.192206;,
  0.271820;-0.962348;0.000000;,
  0.828841;-0.559485;0.000000;,
  0.000000;-0.559485;0.828841;,
  0.000000;-0.962348;0.271820;,
  -0.586079;-0.559484;0.586079;,
  -0.192206;-0.962348;0.192206;,
  -0.828841;-0.559485;0.000000;,
  -0.271820;-0.962348;0.000000;,
  -0.586079;-0.559484;-0.586079;,
  -0.256190;-0.932059;-0.256190;,
  -0.271820;-0.962348;0.000000;,
  -0.828841;-0.559485;0.000000;;
  60;
  3;0,1,2;,
  3;0,3,1;,
  3;0,4,3;,
  3;0,5,4;,
  3;0,6,5;,
  3;0,7,6;,
  3;8,9,10;,
  3;8,10,11;,
  3;8,11,12;,
  3;8,12,13;,
  3;8,13,14;,
  3;8,14,15;,
  3;16,17,18;,
  3;16,18,19;,
  3;20,16,19;,
  3;20,19,21;,
  3;22,23,24;,
  3;22,24,25;,
  3;26,22,25;,
  3;26,25,27;,
  3;28,26,27;,
  3;28,27,29;,
  3;30,28,29;,
  3;30,29,31;,
  3;32,33,34;,
  3;32,34,35;,
  3;17,32,35;,
  3;17,35,18;,
  3;36,37,38;,
  3;36,38,39;,
  3;36,39,17;,
  3;36,17,16;,
  3;40,41,37;,
  3;40,37,36;,
  3;40,36,16;,
  3;40,16,20;,
  3;42,43,44;,
  3;42,44,45;,
  3;42,45,23;,
  3;42,23,22;,
  3;46,47,43;,
  3;46,43,42;,
  3;46,42,22;,
  3;46,22,26;,
  3;48,49,47;,
  3;48,47,46;,
  3;48,46,26;,
  3;48,26,28;,
  3;50,51,49;,
  3;50,49,48;,
  3;50,48,28;,
  3;50,28,30;,
  3;52,53,54;,
  3;52,54,55;,
  3;52,55,33;,
  3;52,33,32;,
  3;39,38,53;,
  3;39,53,52;,
  3;39,52,32;,
  3;39,32,17;;
 }

 MeshTextureCoords {
  56;
  0.686380;0.672560;,
  0.768000;0.590940;,
  0.744100;0.648660;,
  0.744100;0.533230;,
  0.686380;0.509320;,
  0.628670;0.533230;,
  0.604760;0.590940;,
  0.628670;0.648660;,
  0.686380;0.684340;,
  0.752690;0.656870;,
  0.780160;0.590570;,
  0.752690;0.524260;,
  0.686380;0.496790;,
  0.620080;0.524260;,
  0.592610;0.590570;,
  0.620080;0.656870;,
  0.610300;0.264960;,
  0.610300;0.356890;,
  0.587460;0.356890;,
  0.587460;0.272220;,
  0.610300;0.226890;,
  0.587460;0.237150;,
  0.610300;0.490270;,
  0.610300;0.490270;,
  0.587460;0.490270;,
  0.587460;0.490270;,
  0.610300;0.490270;,
  0.587460;0.490270;,
  0.610300;0.490270;,
  0.587460;0.490270;,
  0.610300;0.490270;,
  0.587460;0.490270;,
  0.610300;0.448810;,
  0.610300;0.486890;,
  0.587460;0.476620;,
  0.587460;0.441550;,
  0.751480;0.279980;,
  0.762410;0.290580;,
  0.762410;0.356890;,
  0.751480;0.356890;,
  0.751480;0.248130;,
  0.762410;0.263110;,
  0.751480;0.490270;,
  0.762410;0.490270;,
  0.762410;0.490270;,
  0.751480;0.490270;,
  0.751480;0.490270;,
  0.762410;0.490270;,
  0.751480;0.490270;,
  0.762410;0.490270;,
  0.751480;0.490270;,
  0.762410;0.490270;,
  0.751480;0.433790;,
  0.762410;0.423190;,
  0.762410;0.450660;,
  0.751480;0.465650;;
 }

 MeshMaterialList {
  1;
  60;
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0;

  Material {
   0.800000;0.800000;0.800000;1.000000;;
   5.000000;
   0.000000;0.000000;0.000000;;
   0.501961;0.501961;0.501961;;

   TextureFilename {
    "kff/02.tga";
   }
  }
 }
}